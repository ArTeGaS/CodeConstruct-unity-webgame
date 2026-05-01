const EXTRA_LINES_PER_TASK = 6;
const MAX_INDENT = 6;

const CS_KEYWORDS = new Set([
  "abstract", "as", "base", "bool", "break", "case", "catch", "class", "const", "continue",
  "default", "do", "else", "enum", "false", "finally", "float", "for", "foreach", "if",
  "in", "int", "is", "new", "null", "private", "protected", "public", "return", "static",
  "string", "switch", "this", "true", "try", "using", "void", "while"
]);

const UNITY_TYPES = new Set([
  "MonoBehaviour", "Vector3", "Quaternion", "Transform", "GameObject", "Rigidbody",
  "Collider", "Renderer", "Color", "Mathf", "Time", "Input", "KeyCode", "ForceMode",
  "Random", "Debug"
]);

const tasks = normalizeTasks(window.TASKS_DATA || []);
const extraLines = normalizeLines(window.EXTRA_UNITY_LINES || []);
const allLinesById = buildLineMap(tasks, extraLines);

const state = {
  activeTaskIndex: 0,
  slots: [],
  indents: [],
  bankPoolIds: [],
  bankOrder: [],
  selectedBlockId: null,
  solved: false,
  testRunning: false,
  testClicks: 0,
  testScore: 0
};

const editorSlotsEl = document.getElementById("editor-slots");
const codeBankEl = document.getElementById("code-bank");
const resultEl = document.getElementById("result");
const previewEl = document.getElementById("solution-preview");
const checkBtn = document.getElementById("check-btn");
const resetBtn = document.getElementById("reset-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const runTestBtn = document.getElementById("run-test-btn");
const taskListEl = document.getElementById("task-list");
const taskTitleEl = document.getElementById("task-title");
const taskDescriptionEl = document.getElementById("task-description");
const taskGoalEl = document.getElementById("task-goal");
const taskCountEl = document.getElementById("task-count");
const activeTabEl = document.getElementById("active-tab");
const testSceneEl = document.getElementById("test-scene");
const testObjectEl = document.getElementById("test-object");
const testTargetEl = document.getElementById("test-target");
const testCoinEl = document.getElementById("test-coin");
const testProjectileEl = document.getElementById("test-projectile");
const testCameraEl = document.getElementById("test-camera");
const testStatusEl = document.getElementById("test-status");

init();

function init() {
  if (!tasks.length) {
    disableActions();
    setResult("Не знайдено жодного Unity-завдання. Перевір файл tasks-data.js.", "error");
    return;
  }

  taskCountEl.textContent = `${tasks.length} Unity-завдання`;
  renderTaskList();
  loadTask(0);

  editorSlotsEl.addEventListener("dragover", (event) => {
    const zone = event.target.closest(".slot-drop-zone");
    if (!zone) {
      return;
    }
    event.preventDefault();
    zone.classList.add("is-over");
  });

  editorSlotsEl.addEventListener("dragleave", (event) => {
    const zone = event.target.closest(".slot-drop-zone");
    if (zone) {
      zone.classList.remove("is-over");
    }
  });

  editorSlotsEl.addEventListener("drop", (event) => {
    const zone = event.target.closest(".slot-drop-zone");
    if (!zone) {
      return;
    }
    event.preventDefault();
    zone.classList.remove("is-over");

    const blockId = event.dataTransfer.getData("text/plain");
    const slotIndex = Number(zone.dataset.slot);
    if (!blockId || Number.isNaN(slotIndex)) {
      return;
    }
    placeCodeBlock(blockId, slotIndex);
  });

  codeBankEl.addEventListener("dragstart", (event) => {
    const block = event.target.closest(".code-block");
    if (!block || !event.dataTransfer) {
      return;
    }
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", block.dataset.blockId);
  });

  codeBankEl.addEventListener("click", (event) => {
    const block = event.target.closest(".code-block");
    if (!block) {
      return;
    }
    const clickedId = block.dataset.blockId;
    state.selectedBlockId = state.selectedBlockId === clickedId ? null : clickedId;
    renderBank();
  });

  editorSlotsEl.addEventListener("click", (event) => {
    const actionBtn = event.target.closest("[data-action]");
    if (actionBtn) {
      const slotIndex = Number(actionBtn.dataset.slot);
      if (Number.isNaN(slotIndex)) {
        return;
      }
      handleSlotAction(actionBtn.dataset.action, slotIndex);
      return;
    }

    const zone = event.target.closest(".slot-drop-zone");
    if (!zone) {
      return;
    }
    const slotIndex = Number(zone.dataset.slot);
    if (Number.isNaN(slotIndex)) {
      return;
    }

    if (state.selectedBlockId) {
      placeCodeBlock(state.selectedBlockId, slotIndex);
      return;
    }

    const occupied = state.slots[slotIndex];
    if (occupied?.kind === "code") {
      state.slots[slotIndex] = null;
      state.indents[slotIndex] = 0;
      state.selectedBlockId = occupied.lineId;
      markDirty();
      render();
    }
  });

  taskListEl.addEventListener("click", (event) => {
    const button = event.target.closest("[data-task-index]");
    if (!button) {
      return;
    }
    const index = Number(button.dataset.taskIndex);
    if (Number.isNaN(index)) {
      return;
    }
    loadTask(index);
  });

  testSceneEl.addEventListener("click", triggerSceneInteraction);
  checkBtn.addEventListener("click", checkSolution);
  resetBtn.addEventListener("click", resetPuzzle);
  runTestBtn.addEventListener("click", runPrimitiveTest);
  shuffleBtn.addEventListener("click", () => {
    state.bankOrder = shuffle(state.bankOrder.slice());
    state.selectedBlockId = null;
    renderBank();
  });

  window.render_game_to_text = renderGameToText;
  window.advanceTime = (ms = 1000 / 60) => {
    const steps = Math.max(1, Math.round(ms / (1000 / 60)));
    for (let i = 0; i < steps; i += 1) {
      // The preview is CSS-driven; this hook still gives automated tests a stable surface.
    }
    return renderGameToText();
  };
}

function disableActions() {
  checkBtn.disabled = true;
  resetBtn.disabled = true;
  shuffleBtn.disabled = true;
  runTestBtn.disabled = true;
}

function loadTask(index) {
  state.activeTaskIndex = clamp(index, 0, tasks.length - 1);
  const task = getActiveTask();

  state.slots = new Array(task.steps.length).fill(null);
  state.indents = new Array(task.steps.length).fill(0);
  state.bankPoolIds = generateTaskBankIds(task, index);
  state.bankOrder = shuffle(state.bankPoolIds.slice());
  state.selectedBlockId = null;
  state.solved = false;
  resetTestState();

  activeTabEl.textContent = task.fileName;
  taskTitleEl.textContent = formatTaskLabel(task);
  taskDescriptionEl.textContent = task.description;
  taskGoalEl.textContent = task.testGoal;
  previewEl.hidden = true;

  setResult("Склади C#-скрипт: порядок рядків, дужки та відступи мають збігатися.", "neutral");
  renderTaskList();
  render();
  renderTestScene();
}

function getActiveTask() {
  return tasks[state.activeTaskIndex];
}

function handleSlotAction(action, slotIndex) {
  if (action === "indent-left") {
    updateIndent(slotIndex, -1);
  }
  if (action === "indent-right") {
    updateIndent(slotIndex, 1);
  }
  if (action === "brace-open") {
    setBrace(slotIndex, "{");
  }
  if (action === "brace-close") {
    setBrace(slotIndex, "}");
  }
  if (action === "clear-slot") {
    clearSlot(slotIndex);
  }
}

function placeCodeBlock(blockId, slotIndex) {
  if (!allLinesById.has(blockId)) {
    return;
  }
  removeCodeBlockFromSlots(blockId);
  state.slots[slotIndex] = { kind: "code", lineId: blockId };
  state.selectedBlockId = null;
  markDirty();
  render();
}

function removeCodeBlockFromSlots(blockId) {
  for (let i = 0; i < state.slots.length; i += 1) {
    if (state.slots[i]?.kind === "code" && state.slots[i].lineId === blockId) {
      state.slots[i] = null;
      state.indents[i] = 0;
    }
  }
}

function setBrace(slotIndex, brace) {
  state.slots[slotIndex] = { kind: "brace", brace };
  state.selectedBlockId = null;
  markDirty();
  render();
}

function clearSlot(slotIndex) {
  state.slots[slotIndex] = null;
  state.indents[slotIndex] = 0;
  state.selectedBlockId = null;
  markDirty();
  render();
}

function updateIndent(slotIndex, diff) {
  if (!state.slots[slotIndex]) {
    return;
  }
  state.indents[slotIndex] = clamp(state.indents[slotIndex] + diff, 0, MAX_INDENT);
  markDirty();
  renderEditor();
}

function resetPuzzle() {
  const task = getActiveTask();
  state.slots = new Array(task.steps.length).fill(null);
  state.indents = new Array(task.steps.length).fill(0);
  state.bankOrder = shuffle(state.bankPoolIds.slice());
  state.selectedBlockId = null;
  state.solved = false;
  resetTestState();
  previewEl.hidden = true;
  setResult("Скинула редактор. Збери скрипт знову.", "neutral");
  render();
  renderTestScene();
}

function markDirty() {
  state.solved = false;
  state.testRunning = false;
  previewEl.hidden = true;
}

function resetTestState() {
  state.testRunning = false;
  state.testClicks = 0;
  state.testScore = 0;
}

function renderTaskList() {
  taskListEl.innerHTML = "";
  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "file-item task-btn";
    button.dataset.taskIndex = String(index);
    button.textContent = formatTaskLabel(task);
    if (index === state.activeTaskIndex) {
      button.classList.add("is-active");
    }
    item.appendChild(button);
    taskListEl.appendChild(item);
  });
}

function render() {
  renderEditor();
  renderBank();
}

function renderEditor() {
  const task = getActiveTask();
  editorSlotsEl.innerHTML = "";

  for (let i = 0; i < task.steps.length; i += 1) {
    const slotValue = state.slots[i];
    const slot = document.createElement("li");
    slot.className = "editor-slot";

    const index = document.createElement("span");
    index.className = "slot-index";
    index.textContent = String(i + 1);

    const zone = document.createElement("div");
    zone.className = "slot-drop-zone";
    zone.dataset.slot = String(i);

    if (slotValue) {
      const code = document.createElement("code");
      code.className = slotValue.kind === "brace" ? "code-line brace-line" : "code-line";
      const indentSpaces = " ".repeat(state.indents[i] * 4);
      if (slotValue.kind === "brace") {
        code.textContent = `${indentSpaces}${slotValue.brace}`;
      } else {
        const line = allLinesById.get(slotValue.lineId);
        renderHighlightedCode(code, `${indentSpaces}${line.text}`);
      }
      zone.appendChild(code);
    } else {
      zone.classList.add("is-empty");
      zone.textContent = "Код або дужка";
    }

    const tools = document.createElement("div");
    tools.className = "slot-tools";

    const leftBtn = createToolButton("←", "indent-left", i, "Зменшити відступ");
    leftBtn.disabled = !slotValue || state.indents[i] === 0;

    const rightBtn = createToolButton("→", "indent-right", i, "Збільшити відступ");
    rightBtn.disabled = !slotValue || state.indents[i] >= MAX_INDENT;

    const openBraceBtn = createToolButton("{", "brace-open", i, "Вставити відкривну дужку");
    const closeBraceBtn = createToolButton("}", "brace-close", i, "Вставити закривну дужку");
    const clearBtn = createToolButton("×", "clear-slot", i, "Очистити слот");
    clearBtn.disabled = !slotValue;

    tools.append(leftBtn, rightBtn, openBraceBtn, closeBraceBtn, clearBtn);
    slot.append(index, zone, tools);
    editorSlotsEl.appendChild(slot);
  }
}

function createToolButton(label, action, slotIndex, title) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = action.startsWith("brace") ? "tool-btn brace-tool" : "tool-btn";
  button.dataset.action = action;
  button.dataset.slot = String(slotIndex);
  button.title = title;
  button.setAttribute("aria-label", title);
  button.textContent = label;
  return button;
}

function renderBank() {
  codeBankEl.innerHTML = "";
  const used = new Set(
    state.slots
      .filter((slot) => slot?.kind === "code")
      .map((slot) => slot.lineId)
  );
  const available = state.bankOrder.filter((id) => !used.has(id));

  if (available.length === 0) {
    const donePlaceholder = document.createElement("div");
    donePlaceholder.className = "bank-placeholder";
    donePlaceholder.textContent = "Усі кодові блоки в редакторі. Дужки додаються тільки кнопками біля слотів.";
    codeBankEl.appendChild(donePlaceholder);
    return;
  }

  for (const id of available) {
    const line = allLinesById.get(id);
    if (!line) {
      continue;
    }
    const block = document.createElement("button");
    block.type = "button";
    block.className = "code-block";
    block.draggable = true;
    block.dataset.blockId = id;
    if (state.selectedBlockId === id) {
      block.classList.add("is-selected");
    }

    const code = document.createElement("code");
    code.className = "code-line";
    renderHighlightedCode(code, line.text);
    block.appendChild(code);

    codeBankEl.appendChild(block);
  }
}

function checkSolution() {
  const issues = validateSolution();

  if (issues.length === 0) {
    state.solved = true;
    setResult("Готово. Порядок, C#-дужки та відступи збігаються з Unity-скриптом.", "ok");
    renderSolutionPreview();
    renderTestScene();
    return true;
  }

  state.solved = false;
  const previewIssues = issues.slice(0, 6).join("\n");
  const extra = issues.length > 6 ? `\n...і ще ${issues.length - 6} помилок.` : "";
  setResult(`${previewIssues}${extra}`, "error");
  previewEl.hidden = true;
  renderTestScene();
  return false;
}

function validateSolution() {
  const issues = [];
  const task = getActiveTask();

  for (let i = 0; i < task.steps.length; i += 1) {
    const expected = task.steps[i];
    const actual = state.slots[i];
    const row = i + 1;

    if (!actual) {
      issues.push(`Рядок ${row}: слот порожній.`);
      continue;
    }

    if (actual.kind !== expected.kind) {
      const needed = expected.kind === "brace" ? "структурна дужка кнопкою" : "рядок коду з банку";
      issues.push(`Рядок ${row}: тут потрібен ${needed}.`);
      continue;
    }

    if (expected.kind === "code" && actual.lineId !== expected.lineId) {
      issues.push(`Рядок ${row}: неправильний рядок коду.`);
    }

    if (expected.kind === "brace" && actual.brace !== expected.brace) {
      issues.push(`Рядок ${row}: потрібна дужка '${expected.brace}'.`);
    }

    if (state.indents[i] !== expected.indent) {
      issues.push(`Рядок ${row}: відступ має бути ${expected.indent}, зараз ${state.indents[i]}.`);
    }
  }

  issues.push(...validateBraceBalance(buildProgramRows()));
  return dedupe(issues);
}

function validateBraceBalance(rows) {
  const issues = [];
  const stack = [];

  for (const row of rows) {
    if (row.kind !== "brace") {
      continue;
    }
    if (row.brace === "{") {
      stack.push(row);
    } else if (stack.length === 0) {
      issues.push(`Рядок ${row.lineNumber}: закривна дужка без відкривної.`);
    } else {
      stack.pop();
    }
  }

  if (stack.length > 0) {
    const last = stack[stack.length - 1];
    issues.push(`Рядок ${last.lineNumber}: відкривна дужка не закрита.`);
  }

  return issues;
}

function buildProgramRows() {
  return state.slots
    .map((slot, index) => {
      if (!slot) {
        return null;
      }
      if (slot.kind === "brace") {
        return {
          lineNumber: index + 1,
          kind: "brace",
          brace: slot.brace,
          text: slot.brace,
          indent: state.indents[index]
        };
      }
      const line = allLinesById.get(slot.lineId);
      return {
        lineNumber: index + 1,
        kind: "code",
        lineId: slot.lineId,
        text: line?.text || "",
        indent: state.indents[index]
      };
    })
    .filter(Boolean);
}

function renderSolutionPreview() {
  const source = buildProgramRows()
    .map((row) => `${" ".repeat(row.indent * 4)}${row.text}`)
    .join("\n");

  previewEl.hidden = false;
  previewEl.textContent = source;
}

function runPrimitiveTest() {
  if (!checkSolution()) {
    testStatusEl.textContent = "Тест заблоковано: спершу виправ скрипт.";
    return;
  }

  state.testRunning = true;
  state.testClicks = 0;
  state.testScore = 0;
  renderTestScene();

  const task = getActiveTask();
  setResult(`Тест запущено: ${task.testGoal}`, "ok");
}

function renderTestScene() {
  const task = getActiveTask();
  const runtime = task.runtime || {};
  const effect = runtime.effect || "idle";
  const primitive = runtime.primitive || task.primitive || "cube";
  const isRunning = state.testRunning && state.solved;

  testSceneEl.className = `test-scene effect-${effect}${isRunning ? " is-running" : ""}`;
  testObjectEl.className = `test-object ${primitive}${isRunning ? " is-running" : ""}`;
  testObjectEl.style.setProperty("--object-color", runtime.color || "#4ea1ff");
  testObjectEl.dataset.label = runtime.label || task.title;

  testTargetEl.hidden = !["look-at", "distance-color", "patrol", "camera"].includes(effect);
  testCoinEl.hidden = !["collect", "win"].includes(effect);
  testProjectileEl.hidden = !["spawn", "shoot"].includes(effect);
  testCameraEl.hidden = effect !== "camera";

  if (!state.solved) {
    testStatusEl.textContent = "Сцена очікує правильний скрипт.";
    return;
  }

  if (!isRunning) {
    testStatusEl.textContent = "Скрипт правильний. Натисни «Тест примітива».";
    return;
  }

  testStatusEl.textContent = getRuntimeStatus(task, effect);
}

function getRuntimeStatus(task, effect) {
  if (effect === "click-color") {
    return state.testClicks > 0
      ? `Клік змінено: колір оновлено ${state.testClicks} раз.`
      : "Клікни по сцені, щоб змінити колір куба.";
  }
  if (effect === "health") {
    const health = Math.max(0, 3 - state.testClicks);
    return health > 0
      ? `Health: ${health}. Клікни по кубу, щоб завдати удар.`
      : "Health: 0. Куб знищено.";
  }
  if (effect === "collect") {
    return state.testScore > 0
      ? `Score: ${state.testScore}. Монетку зібрано.`
      : "Клікни по сцені, щоб симулювати trigger з монеткою.";
  }
  if (effect === "win") {
    return state.testScore >= 3
      ? "Score: 3. WIN: куб зелений, гра зупинена."
      : `Score: ${state.testScore}. Клікай, щоб зібрати 3 монети.`;
  }
  return task.testGoal;
}

function triggerSceneInteraction() {
  if (!state.testRunning || !state.solved) {
    return;
  }

  const effect = getActiveTask().runtime?.effect;
  if (effect === "click-color") {
    state.testClicks += 1;
    const palette = ["#f78c6c", "#82aaff", "#c3e88d", "#ffcb6b", "#c792ea"];
    testObjectEl.style.setProperty("--object-color", palette[state.testClicks % palette.length]);
  }

  if (effect === "health") {
    state.testClicks = Math.min(3, state.testClicks + 1);
    testObjectEl.classList.toggle("is-destroyed", state.testClicks >= 3);
  }

  if (effect === "collect") {
    state.testScore = 1;
    testCoinEl.hidden = true;
  }

  if (effect === "win") {
    state.testScore = Math.min(3, state.testScore + 1);
    if (state.testScore >= 3) {
      testObjectEl.style.setProperty("--object-color", "#42be65");
      testSceneEl.classList.add("is-won");
      testCoinEl.hidden = true;
    }
  }

  testStatusEl.textContent = getRuntimeStatus(getActiveTask(), effect);
}

function renderHighlightedCode(element, text) {
  element.innerHTML = highlightCSharpLine(text);
}

function highlightCSharpLine(text) {
  const tokenPattern =
    /\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?f?\b|\b[A-Za-z_][A-Za-z0-9_]*\b|==|!=|<=|>=|\+\+|--|\+=|-=|\*=|\/=|&&|\|\||=>|[+\-*/%<>=!&|:;()[\]{},.]|\S/gu;

  let html = "";
  let lastIndex = 0;
  let match;

  while ((match = tokenPattern.exec(text)) !== null) {
    const token = match[0];
    const start = match.index;
    const end = start + token.length;

    if (start > lastIndex) {
      html += escapeHtml(text.slice(lastIndex, start));
    }

    let cls = "";
    if (token.startsWith("//")) {
      cls = "py-token-comment";
    } else if (/^"(?:\\.|[^"\\])*"$|^'(?:\\.|[^'\\])*'$/u.test(token)) {
      cls = "py-token-string";
    } else if (/^\d+(?:\.\d+)?f?$/u.test(token)) {
      cls = "py-token-number";
    } else if (/^[A-Za-z_][A-Za-z0-9_]*$/u.test(token)) {
      if (CS_KEYWORDS.has(token)) {
        cls = "py-token-keyword";
      } else if (UNITY_TYPES.has(token)) {
        cls = "py-token-builtin";
      } else if (isFunctionCallAt(text, end)) {
        cls = "py-token-function";
      }
    } else if (/^(==|!=|<=|>=|\+\+|--|\+=|-=|\*=|\/=|&&|\|\||=>|[+\-*/%<>=!&|:])$/u.test(token)) {
      cls = "py-token-operator";
    }

    html += cls ? `<span class="${cls}">${escapeHtml(token)}</span>` : escapeHtml(token);
    lastIndex = end;
  }

  if (lastIndex < text.length) {
    html += escapeHtml(text.slice(lastIndex));
  }

  return html;
}

function isFunctionCallAt(text, fromIndex) {
  const tail = text.slice(fromIndex);
  return /^\s*\(/u.test(tail);
}

function generateTaskBankIds(task, taskIndex) {
  const taskIds = task.lines.map((line) => line.id);
  const shuffledExtra = seededShuffle(extraLines, taskIndex + 11)
    .filter((line) => !taskIds.includes(line.id))
    .slice(0, EXTRA_LINES_PER_TASK)
    .map((line) => line.id);
  return [...taskIds, ...shuffledExtra];
}

function normalizeTasks(rawTasks) {
  return rawTasks.map((task, index) => {
    const lines = normalizeLines(task.lines || []);
    return {
      id: String(task.id || `task-${index + 1}`),
      number: Number(task.number || index + 1),
      title: String(task.title || `UnityTask${index + 1}`),
      fileName: String(task.fileName || `Task${index + 1}.cs`),
      primitive: String(task.primitive || "cube"),
      description: String(task.description || ""),
      testGoal: String(task.testGoal || ""),
      runtime: task.runtime || {},
      lines,
      steps: (task.steps || []).map((step) => ({
        kind: step.kind === "brace" ? "brace" : "code",
        lineId: step.lineId ? String(step.lineId) : "",
        brace: step.brace === "}" ? "}" : "{",
        indent: Number(step.indent || 0)
      }))
    };
  });
}

function normalizeLines(lines) {
  return lines.map((line) => ({
    id: String(line.id),
    text: String(line.text)
  }));
}

function buildLineMap(taskList, extras) {
  const map = new Map();
  for (const task of taskList) {
    for (const line of task.lines) {
      map.set(line.id, line);
    }
  }
  for (const line of extras) {
    map.set(line.id, line);
  }
  return map;
}

function formatTaskLabel(task) {
  return `${String(task.number).padStart(2, "0")} ${task.title}`;
}

function setResult(message, type) {
  resultEl.textContent = message;
  resultEl.className = `result is-${type}`;
}

function renderGameToText() {
  const task = getActiveTask();
  const payload = {
    mode: "unity-code-construct",
    task: task.id,
    file: task.fileName,
    solved: state.solved,
    selectedBlockId: state.selectedBlockId,
    slots: state.slots.map((slot, index) => ({
      row: index + 1,
      indent: state.indents[index],
      kind: slot?.kind || "empty",
      value: slot?.kind === "code" ? allLinesById.get(slot.lineId)?.text : slot?.brace || ""
    })),
    test: {
      running: state.testRunning,
      primitive: task.runtime?.primitive || task.primitive,
      effect: task.runtime?.effect || "idle",
      clicks: state.testClicks,
      score: state.testScore
    }
  };
  return JSON.stringify(payload);
}

function shuffle(items) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function seededShuffle(items, seed) {
  const copy = items.slice();
  let value = seed || 1;
  const random = () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function dedupe(items) {
  return [...new Set(items)];
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
