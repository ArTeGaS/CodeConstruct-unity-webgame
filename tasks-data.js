window.TASKS_DATA = [
  {
    id: "spin-cube",
    number: 1,
    title: "SpinCube",
    fileName: "SpinCube.cs",
    primitive: "cube",
    description: "Склади MonoBehaviour, який постійно обертає куб навколо осі Y.",
    testGoal: "Після запуску тесту куб має плавно крутитися на місці.",
    runtime: {
      primitive: "cube",
      effect: "spin",
      color: "#4ea1ff",
      label: "Rotate Y"
    },
    lines: [
      { id: "spin-using", text: "using UnityEngine;" },
      { id: "spin-class", text: "public class SpinCube : MonoBehaviour" },
      { id: "spin-speed", text: "public float speed = 90f;" },
      { id: "spin-update", text: "void Update()" },
      { id: "spin-rotate", text: "transform.Rotate(0f, speed * Time.deltaTime, 0f);" }
    ],
    steps: [
      { kind: "code", lineId: "spin-using", indent: 0 },
      { kind: "code", lineId: "spin-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "spin-speed", indent: 1 },
      { kind: "code", lineId: "spin-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "spin-rotate", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "move-right",
    number: 2,
    title: "MoveRight",
    fileName: "MoveRight.cs",
    primitive: "cube",
    description: "Склади скрипт, який рухає куб праворуч з постійною швидкістю.",
    testGoal: "Куб має повільно їхати вправо по сцені.",
    runtime: {
      primitive: "cube",
      effect: "move-right",
      color: "#66d9a3",
      label: "Translate X"
    },
    lines: [
      { id: "right-using", text: "using UnityEngine;" },
      { id: "right-class", text: "public class MoveRight : MonoBehaviour" },
      { id: "right-speed", text: "public float speed = 2f;" },
      { id: "right-update", text: "void Update()" },
      { id: "right-move", text: "transform.Translate(Vector3.right * speed * Time.deltaTime);" }
    ],
    steps: [
      { kind: "code", lineId: "right-using", indent: 0 },
      { kind: "code", lineId: "right-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "right-speed", indent: 1 },
      { kind: "code", lineId: "right-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "right-move", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "float-sphere",
    number: 3,
    title: "FloatSphere",
    fileName: "FloatSphere.cs",
    primitive: "sphere",
    description: "Склади скрипт, який змушує сферу плавно рухатися вгору-вниз.",
    testGoal: "Сфера має коливатися по вертикалі, не відлітаючи зі сцени.",
    runtime: {
      primitive: "sphere",
      effect: "bob",
      color: "#c586ff",
      label: "Sine Y"
    },
    lines: [
      { id: "float-using", text: "using UnityEngine;" },
      { id: "float-class", text: "public class FloatSphere : MonoBehaviour" },
      { id: "float-start", text: "private Vector3 startPosition;" },
      { id: "float-start-method", text: "void Start()" },
      { id: "float-save", text: "startPosition = transform.position;" },
      { id: "float-update", text: "void Update()" },
      { id: "float-y", text: "float y = Mathf.Sin(Time.time) * 1.5f;" },
      { id: "float-position", text: "transform.position = startPosition + Vector3.up * y;" }
    ],
    steps: [
      { kind: "code", lineId: "float-using", indent: 0 },
      { kind: "code", lineId: "float-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "float-start", indent: 1 },
      { kind: "code", lineId: "float-start-method", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "float-save", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "code", lineId: "float-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "float-y", indent: 2 },
      { kind: "code", lineId: "float-position", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "grow-object",
    number: 4,
    title: "GrowObject",
    fileName: "GrowObject.cs",
    primitive: "cube",
    description: "Склади скрипт, який збільшує куб, доки він не досягне максимального розміру.",
    testGoal: "Куб має поступово збільшитися і зупинитися.",
    runtime: {
      primitive: "cube",
      effect: "grow",
      color: "#ffd166",
      label: "Scale"
    },
    lines: [
      { id: "grow-using", text: "using UnityEngine;" },
      { id: "grow-class", text: "public class GrowObject : MonoBehaviour" },
      { id: "grow-speed", text: "public float growSpeed = 0.5f;" },
      { id: "grow-max", text: "public float maxSize = 2f;" },
      { id: "grow-update", text: "void Update()" },
      { id: "grow-if", text: "if (transform.localScale.x < maxSize)" },
      { id: "grow-scale", text: "transform.localScale += Vector3.one * growSpeed * Time.deltaTime;" }
    ],
    steps: [
      { kind: "code", lineId: "grow-using", indent: 0 },
      { kind: "code", lineId: "grow-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "grow-speed", indent: 1 },
      { kind: "code", lineId: "grow-max", indent: 1 },
      { kind: "code", lineId: "grow-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "grow-if", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "grow-scale", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "start-color",
    number: 5,
    title: "StartColor",
    fileName: "StartColor.cs",
    primitive: "sphere",
    description: "Склади скрипт, який у Start змінює колір примітива.",
    testGoal: "Після тесту сфера має стати блакитною.",
    runtime: {
      primitive: "sphere",
      effect: "start-color",
      color: "#4ec9b0",
      label: "Renderer color"
    },
    lines: [
      { id: "color-using", text: "using UnityEngine;" },
      { id: "color-class", text: "public class StartColor : MonoBehaviour" },
      { id: "color-start", text: "void Start()" },
      { id: "color-renderer", text: "Renderer renderer = GetComponent<Renderer>();" },
      { id: "color-set", text: "renderer.material.color = Color.cyan;" }
    ],
    steps: [
      { kind: "code", lineId: "color-using", indent: 0 },
      { kind: "code", lineId: "color-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "color-start", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "color-renderer", indent: 2 },
      { kind: "code", lineId: "color-set", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "click-color",
    number: 6,
    title: "ClickColor",
    fileName: "ClickColor.cs",
    primitive: "cube",
    description: "Склади скрипт, який змінює колір куба після кліку мишкою.",
    testGoal: "Клік по кубу в тесті має перемикати його колір.",
    runtime: {
      primitive: "cube",
      effect: "click-color",
      color: "#f78c6c",
      label: "OnMouseDown"
    },
    lines: [
      { id: "click-using", text: "using UnityEngine;" },
      { id: "click-class", text: "public class ClickColor : MonoBehaviour" },
      { id: "click-method", text: "void OnMouseDown()" },
      { id: "click-renderer", text: "Renderer renderer = GetComponent<Renderer>();" },
      { id: "click-color", text: "renderer.material.color = Random.ColorHSV();" }
    ],
    steps: [
      { kind: "code", lineId: "click-using", indent: 0 },
      { kind: "code", lineId: "click-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "click-method", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "click-renderer", indent: 2 },
      { kind: "code", lineId: "click-color", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "keyboard-mover",
    number: 7,
    title: "KeyboardMover",
    fileName: "KeyboardMover.cs",
    primitive: "cube",
    description: "Склади скрипт, який рухає куб клавішами WASD або стрілками.",
    testGoal: "У тесті куб має реагувати на напрямок руху.",
    runtime: {
      primitive: "cube",
      effect: "keyboard",
      color: "#82aaff",
      label: "Input axes"
    },
    lines: [
      { id: "keys-using", text: "using UnityEngine;" },
      { id: "keys-class", text: "public class KeyboardMover : MonoBehaviour" },
      { id: "keys-speed", text: "public float speed = 4f;" },
      { id: "keys-update", text: "void Update()" },
      { id: "keys-horizontal", text: "float horizontal = Input.GetAxis(\"Horizontal\");" },
      { id: "keys-vertical", text: "float vertical = Input.GetAxis(\"Vertical\");" },
      { id: "keys-move", text: "Vector3 move = new Vector3(horizontal, 0f, vertical);" },
      { id: "keys-translate", text: "transform.Translate(move * speed * Time.deltaTime);" }
    ],
    steps: [
      { kind: "code", lineId: "keys-using", indent: 0 },
      { kind: "code", lineId: "keys-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "keys-speed", indent: 1 },
      { kind: "code", lineId: "keys-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "keys-horizontal", indent: 2 },
      { kind: "code", lineId: "keys-vertical", indent: 2 },
      { kind: "code", lineId: "keys-move", indent: 2 },
      { kind: "code", lineId: "keys-translate", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "jump-space",
    number: 8,
    title: "JumpOnSpace",
    fileName: "JumpOnSpace.cs",
    primitive: "sphere",
    description: "Склади скрипт, який підкидає сферу вгору після натискання Space.",
    testGoal: "Сфера має зробити короткий стрибок угору.",
    runtime: {
      primitive: "sphere",
      effect: "jump",
      color: "#ffcb6b",
      label: "AddForce"
    },
    lines: [
      { id: "jump-using", text: "using UnityEngine;" },
      { id: "jump-class", text: "public class JumpOnSpace : MonoBehaviour" },
      { id: "jump-force", text: "public float jumpForce = 5f;" },
      { id: "jump-body", text: "private Rigidbody rb;" },
      { id: "jump-start", text: "void Start()" },
      { id: "jump-cache", text: "rb = GetComponent<Rigidbody>();" },
      { id: "jump-update", text: "void Update()" },
      { id: "jump-if", text: "if (Input.GetKeyDown(KeyCode.Space))" },
      { id: "jump-add", text: "rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);" }
    ],
    steps: [
      { kind: "code", lineId: "jump-using", indent: 0 },
      { kind: "code", lineId: "jump-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "jump-force", indent: 1 },
      { kind: "code", lineId: "jump-body", indent: 1 },
      { kind: "code", lineId: "jump-start", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "jump-cache", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "code", lineId: "jump-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "jump-if", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "jump-add", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "clamp-position",
    number: 9,
    title: "ClampPosition",
    fileName: "ClampPosition.cs",
    primitive: "cube",
    description: "Склади скрипт, який не дає кубу вийти за межі по осі X.",
    testGoal: "Куб рухається, але зупиняється біля країв.",
    runtime: {
      primitive: "cube",
      effect: "clamp",
      color: "#b5cea8",
      label: "Mathf.Clamp"
    },
    lines: [
      { id: "clamp-using", text: "using UnityEngine;" },
      { id: "clamp-class", text: "public class ClampPosition : MonoBehaviour" },
      { id: "clamp-limit", text: "public float limit = 4f;" },
      { id: "clamp-update", text: "void Update()" },
      { id: "clamp-position", text: "Vector3 position = transform.position;" },
      { id: "clamp-x", text: "position.x = Mathf.Clamp(position.x, -limit, limit);" },
      { id: "clamp-assign", text: "transform.position = position;" }
    ],
    steps: [
      { kind: "code", lineId: "clamp-using", indent: 0 },
      { kind: "code", lineId: "clamp-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "clamp-limit", indent: 1 },
      { kind: "code", lineId: "clamp-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "clamp-position", indent: 2 },
      { kind: "code", lineId: "clamp-x", indent: 2 },
      { kind: "code", lineId: "clamp-assign", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "ping-pong",
    number: 10,
    title: "PingPongMover",
    fileName: "PingPongMover.cs",
    primitive: "sphere",
    description: "Склади скрипт, який водить сферу між двома точками.",
    testGoal: "Сфера має рухатися вліво-вправо між межами.",
    runtime: {
      primitive: "sphere",
      effect: "ping-pong",
      color: "#f07178",
      label: "PingPong"
    },
    lines: [
      { id: "ping-using", text: "using UnityEngine;" },
      { id: "ping-class", text: "public class PingPongMover : MonoBehaviour" },
      { id: "ping-speed", text: "public float speed = 2f;" },
      { id: "ping-distance", text: "public float distance = 3f;" },
      { id: "ping-start", text: "private Vector3 startPosition;" },
      { id: "ping-start-method", text: "void Start()" },
      { id: "ping-save", text: "startPosition = transform.position;" },
      { id: "ping-update", text: "void Update()" },
      { id: "ping-x", text: "float x = Mathf.PingPong(Time.time * speed, distance);" },
      { id: "ping-position", text: "transform.position = startPosition + Vector3.right * x;" }
    ],
    steps: [
      { kind: "code", lineId: "ping-using", indent: 0 },
      { kind: "code", lineId: "ping-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "ping-speed", indent: 1 },
      { kind: "code", lineId: "ping-distance", indent: 1 },
      { kind: "code", lineId: "ping-start", indent: 1 },
      { kind: "code", lineId: "ping-start-method", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "ping-save", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "code", lineId: "ping-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "ping-x", indent: 2 },
      { kind: "code", lineId: "ping-position", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "look-at",
    number: 11,
    title: "LookAtTarget",
    fileName: "LookAtTarget.cs",
    primitive: "cube",
    description: "Склади скрипт, який повертає куб у бік цілі.",
    testGoal: "Куб має повернутися носом до маленької сфери-цілі.",
    runtime: {
      primitive: "cube",
      effect: "look-at",
      color: "#9cdcfe",
      label: "LookAt"
    },
    lines: [
      { id: "look-using", text: "using UnityEngine;" },
      { id: "look-class", text: "public class LookAtTarget : MonoBehaviour" },
      { id: "look-target", text: "public Transform target;" },
      { id: "look-update", text: "void Update()" },
      { id: "look-if", text: "if (target != null)" },
      { id: "look-call", text: "transform.LookAt(target);" }
    ],
    steps: [
      { kind: "code", lineId: "look-using", indent: 0 },
      { kind: "code", lineId: "look-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "look-target", indent: 1 },
      { kind: "code", lineId: "look-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "look-if", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "look-call", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "distance-color",
    number: 12,
    title: "DistanceColor",
    fileName: "DistanceColor.cs",
    primitive: "sphere",
    description: "Склади скрипт, який змінює колір сфери, якщо вона близько до цілі.",
    testGoal: "Сфера має ставати зеленою біля цілі та червоною далеко від неї.",
    runtime: {
      primitive: "sphere",
      effect: "distance-color",
      color: "#c3e88d",
      label: "Distance"
    },
    lines: [
      { id: "dist-using", text: "using UnityEngine;" },
      { id: "dist-class", text: "public class DistanceColor : MonoBehaviour" },
      { id: "dist-target", text: "public Transform target;" },
      { id: "dist-limit", text: "public float nearDistance = 2f;" },
      { id: "dist-update", text: "void Update()" },
      { id: "dist-if", text: "if (Vector3.Distance(transform.position, target.position) < nearDistance)" },
      { id: "dist-green", text: "GetComponent<Renderer>().material.color = Color.green;" },
      { id: "dist-else", text: "else" },
      { id: "dist-red", text: "GetComponent<Renderer>().material.color = Color.red;" }
    ],
    steps: [
      { kind: "code", lineId: "dist-using", indent: 0 },
      { kind: "code", lineId: "dist-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "dist-target", indent: 1 },
      { kind: "code", lineId: "dist-limit", indent: 1 },
      { kind: "code", lineId: "dist-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "dist-if", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "dist-green", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "code", lineId: "dist-else", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "dist-red", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "health-click",
    number: 13,
    title: "HealthOnHit",
    fileName: "HealthOnHit.cs",
    primitive: "cube",
    description: "Склади скрипт: кожен клік зменшує здоров'я куба, після нуля куб зникає.",
    testGoal: "Після кількох кліків куб має зникнути.",
    runtime: {
      primitive: "cube",
      effect: "health",
      color: "#ff5370",
      label: "Health"
    },
    lines: [
      { id: "hp-using", text: "using UnityEngine;" },
      { id: "hp-class", text: "public class HealthOnHit : MonoBehaviour" },
      { id: "hp-value", text: "public int health = 3;" },
      { id: "hp-click", text: "void OnMouseDown()" },
      { id: "hp-minus", text: "health--;" },
      { id: "hp-if", text: "if (health <= 0)" },
      { id: "hp-destroy", text: "Destroy(gameObject);" }
    ],
    steps: [
      { kind: "code", lineId: "hp-using", indent: 0 },
      { kind: "code", lineId: "hp-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "hp-value", indent: 1 },
      { kind: "code", lineId: "hp-click", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "hp-minus", indent: 2 },
      { kind: "code", lineId: "hp-if", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "hp-destroy", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "collect-coin",
    number: 14,
    title: "CollectCoin",
    fileName: "CollectCoin.cs",
    primitive: "cube",
    description: "Склади скрипт збору монетки через trigger.",
    testGoal: "Куб торкається монетки, монетка зникає, score збільшується.",
    runtime: {
      primitive: "cube",
      effect: "collect",
      color: "#89ddff",
      label: "Trigger"
    },
    lines: [
      { id: "coin-using", text: "using UnityEngine;" },
      { id: "coin-class", text: "public class CollectCoin : MonoBehaviour" },
      { id: "coin-score", text: "public int score = 0;" },
      { id: "coin-trigger", text: "void OnTriggerEnter(Collider other)" },
      { id: "coin-if", text: "if (other.CompareTag(\"Coin\"))" },
      { id: "coin-add", text: "score++;" },
      { id: "coin-destroy", text: "Destroy(other.gameObject);" }
    ],
    steps: [
      { kind: "code", lineId: "coin-using", indent: 0 },
      { kind: "code", lineId: "coin-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "coin-score", indent: 1 },
      { kind: "code", lineId: "coin-trigger", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "coin-if", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "coin-add", indent: 3 },
      { kind: "code", lineId: "coin-destroy", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "danger-zone",
    number: 15,
    title: "DangerZone",
    fileName: "DangerZone.cs",
    primitive: "cube",
    description: "Склади скрипт, який повертає куб на старт, якщо він зайшов у небезпечну зону.",
    testGoal: "Куб торкається червоної зони й повертається на старт.",
    runtime: {
      primitive: "cube",
      effect: "danger",
      color: "#ff6b6b",
      label: "Reset"
    },
    lines: [
      { id: "danger-using", text: "using UnityEngine;" },
      { id: "danger-class", text: "public class DangerZone : MonoBehaviour" },
      { id: "danger-start-pos", text: "private Vector3 startPosition;" },
      { id: "danger-start", text: "void Start()" },
      { id: "danger-save", text: "startPosition = transform.position;" },
      { id: "danger-trigger", text: "void OnTriggerEnter(Collider other)" },
      { id: "danger-if", text: "if (other.CompareTag(\"Danger\"))" },
      { id: "danger-reset", text: "transform.position = startPosition;" }
    ],
    steps: [
      { kind: "code", lineId: "danger-using", indent: 0 },
      { kind: "code", lineId: "danger-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "danger-start-pos", indent: 1 },
      { kind: "code", lineId: "danger-start", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "danger-save", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "code", lineId: "danger-trigger", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "danger-if", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "danger-reset", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "timer-destroy",
    number: 16,
    title: "TimerDestroy",
    fileName: "TimerDestroy.cs",
    primitive: "sphere",
    description: "Склади скрипт, який знищує сферу через кілька секунд.",
    testGoal: "Сфера має поступово зникнути після таймера.",
    runtime: {
      primitive: "sphere",
      effect: "timer",
      color: "#d7ba7d",
      label: "Timer"
    },
    lines: [
      { id: "timer-using", text: "using UnityEngine;" },
      { id: "timer-class", text: "public class TimerDestroy : MonoBehaviour" },
      { id: "timer-life", text: "public float lifeTime = 5f;" },
      { id: "timer-update", text: "void Update()" },
      { id: "timer-minus", text: "lifeTime -= Time.deltaTime;" },
      { id: "timer-if", text: "if (lifeTime <= 0f)" },
      { id: "timer-destroy", text: "Destroy(gameObject);" }
    ],
    steps: [
      { kind: "code", lineId: "timer-using", indent: 0 },
      { kind: "code", lineId: "timer-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "timer-life", indent: 1 },
      { kind: "code", lineId: "timer-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "timer-minus", indent: 2 },
      { kind: "code", lineId: "timer-if", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "timer-destroy", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "spawn-spheres",
    number: 17,
    title: "SpawnSpheres",
    fileName: "SpawnSpheres.cs",
    primitive: "cube",
    description: "Склади скрипт, який створює сферу перед кубом після натискання Space.",
    testGoal: "Перед кубом має з'явитися нова сфера.",
    runtime: {
      primitive: "cube",
      effect: "spawn",
      color: "#7fdbca",
      label: "Instantiate"
    },
    lines: [
      { id: "spawn-using", text: "using UnityEngine;" },
      { id: "spawn-class", text: "public class SpawnSpheres : MonoBehaviour" },
      { id: "spawn-prefab", text: "public GameObject spherePrefab;" },
      { id: "spawn-update", text: "void Update()" },
      { id: "spawn-if", text: "if (Input.GetKeyDown(KeyCode.Space))" },
      { id: "spawn-pos", text: "Vector3 spawnPosition = transform.position + transform.forward * 2f;" },
      { id: "spawn-call", text: "Instantiate(spherePrefab, spawnPosition, Quaternion.identity);" }
    ],
    steps: [
      { kind: "code", lineId: "spawn-using", indent: 0 },
      { kind: "code", lineId: "spawn-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "spawn-prefab", indent: 1 },
      { kind: "code", lineId: "spawn-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "spawn-if", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "spawn-pos", indent: 3 },
      { kind: "code", lineId: "spawn-call", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "simple-shooter",
    number: 18,
    title: "SimpleShooter",
    fileName: "SimpleShooter.cs",
    primitive: "cube",
    description: "Склади скрипт, який створює кулю і штовхає її вперед.",
    testGoal: "З куба має вилетіти маленька сфера.",
    runtime: {
      primitive: "cube",
      effect: "shoot",
      color: "#ff9cac",
      label: "Projectile"
    },
    lines: [
      { id: "shoot-using", text: "using UnityEngine;" },
      { id: "shoot-class", text: "public class SimpleShooter : MonoBehaviour" },
      { id: "shoot-prefab", text: "public Rigidbody bulletPrefab;" },
      { id: "shoot-force", text: "public float force = 12f;" },
      { id: "shoot-update", text: "void Update()" },
      { id: "shoot-if", text: "if (Input.GetKeyDown(KeyCode.Space))" },
      { id: "shoot-create", text: "Rigidbody bullet = Instantiate(bulletPrefab, transform.position, transform.rotation);" },
      { id: "shoot-add", text: "bullet.AddForce(transform.forward * force, ForceMode.Impulse);" }
    ],
    steps: [
      { kind: "code", lineId: "shoot-using", indent: 0 },
      { kind: "code", lineId: "shoot-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "shoot-prefab", indent: 1 },
      { kind: "code", lineId: "shoot-force", indent: 1 },
      { kind: "code", lineId: "shoot-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "shoot-if", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "shoot-create", indent: 3 },
      { kind: "code", lineId: "shoot-add", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "camera-follow",
    number: 19,
    title: "CameraFollow",
    fileName: "CameraFollow.cs",
    primitive: "sphere",
    description: "Склади скрипт камери, яка слідує за ціллю із заданим відступом.",
    testGoal: "У тесті камера-рамка має тримати сферу в центрі.",
    runtime: {
      primitive: "sphere",
      effect: "camera",
      color: "#a6e22e",
      label: "LateUpdate"
    },
    lines: [
      { id: "cam-using", text: "using UnityEngine;" },
      { id: "cam-class", text: "public class CameraFollow : MonoBehaviour" },
      { id: "cam-target", text: "public Transform target;" },
      { id: "cam-offset", text: "public Vector3 offset = new Vector3(0f, 4f, -6f);" },
      { id: "cam-late", text: "void LateUpdate()" },
      { id: "cam-if", text: "if (target != null)" },
      { id: "cam-position", text: "transform.position = target.position + offset;" }
    ],
    steps: [
      { kind: "code", lineId: "cam-using", indent: 0 },
      { kind: "code", lineId: "cam-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "cam-target", indent: 1 },
      { kind: "code", lineId: "cam-offset", indent: 1 },
      { kind: "code", lineId: "cam-late", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "cam-if", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "cam-position", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "patrol-chase",
    number: 20,
    title: "PatrolAndChase",
    fileName: "PatrolAndChase.cs",
    primitive: "sphere",
    description: "Склади скрипт: сфера патрулює, але якщо гравець близько, рухається до нього.",
    testGoal: "Сфера має змінити поведінку біля куба-гравця.",
    runtime: {
      primitive: "sphere",
      effect: "patrol",
      color: "#c792ea",
      label: "AI"
    },
    lines: [
      { id: "ai-using", text: "using UnityEngine;" },
      { id: "ai-class", text: "public class PatrolAndChase : MonoBehaviour" },
      { id: "ai-player", text: "public Transform player;" },
      { id: "ai-speed", text: "public float speed = 2f;" },
      { id: "ai-range", text: "public float chaseRange = 4f;" },
      { id: "ai-update", text: "void Update()" },
      { id: "ai-if", text: "if (Vector3.Distance(transform.position, player.position) < chaseRange)" },
      { id: "ai-chase", text: "transform.position = Vector3.MoveTowards(transform.position, player.position, speed * Time.deltaTime);" },
      { id: "ai-else", text: "else" },
      { id: "ai-patrol", text: "transform.Translate(Vector3.right * Mathf.Sin(Time.time) * speed * Time.deltaTime);" }
    ],
    steps: [
      { kind: "code", lineId: "ai-using", indent: 0 },
      { kind: "code", lineId: "ai-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "ai-player", indent: 1 },
      { kind: "code", lineId: "ai-speed", indent: 1 },
      { kind: "code", lineId: "ai-range", indent: 1 },
      { kind: "code", lineId: "ai-update", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "ai-if", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "ai-chase", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "code", lineId: "ai-else", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "ai-patrol", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  },
  {
    id: "win-condition",
    number: 21,
    title: "MiniGameWinCondition",
    fileName: "MiniGameWinCondition.cs",
    primitive: "cube",
    description: "Склади скрипт перемоги: після трьох монет гра зупиняється, а куб стає зеленим.",
    testGoal: "Після збору третьої монети куб має стати зеленим і показати стан WIN.",
    runtime: {
      primitive: "cube",
      effect: "win",
      color: "#42be65",
      label: "Win"
    },
    lines: [
      { id: "win-using", text: "using UnityEngine;" },
      { id: "win-class", text: "public class MiniGameWinCondition : MonoBehaviour" },
      { id: "win-score", text: "public int score = 0;" },
      { id: "win-state", text: "private bool gameWon = false;" },
      { id: "win-trigger", text: "void OnTriggerEnter(Collider other)" },
      { id: "win-if-coin", text: "if (other.CompareTag(\"Coin\") && !gameWon)" },
      { id: "win-score-plus", text: "score++;" },
      { id: "win-destroy", text: "Destroy(other.gameObject);" },
      { id: "win-if-score", text: "if (score >= 3)" },
      { id: "win-set", text: "gameWon = true;" },
      { id: "win-color", text: "GetComponent<Renderer>().material.color = Color.green;" }
    ],
    steps: [
      { kind: "code", lineId: "win-using", indent: 0 },
      { kind: "code", lineId: "win-class", indent: 0 },
      { kind: "brace", brace: "{", indent: 0 },
      { kind: "code", lineId: "win-score", indent: 1 },
      { kind: "code", lineId: "win-state", indent: 1 },
      { kind: "code", lineId: "win-trigger", indent: 1 },
      { kind: "brace", brace: "{", indent: 1 },
      { kind: "code", lineId: "win-if-coin", indent: 2 },
      { kind: "brace", brace: "{", indent: 2 },
      { kind: "code", lineId: "win-score-plus", indent: 3 },
      { kind: "code", lineId: "win-destroy", indent: 3 },
      { kind: "code", lineId: "win-if-score", indent: 3 },
      { kind: "brace", brace: "{", indent: 3 },
      { kind: "code", lineId: "win-set", indent: 4 },
      { kind: "code", lineId: "win-color", indent: 4 },
      { kind: "brace", brace: "}", indent: 3 },
      { kind: "brace", brace: "}", indent: 2 },
      { kind: "brace", brace: "}", indent: 1 },
      { kind: "brace", brace: "}", indent: 0 }
    ]
  }
];

window.EXTRA_UNITY_LINES = [
  { id: "extra-debug-log", text: "Debug.Log(\"Test\");" },
  { id: "extra-wrong-update", text: "void FixedUpdate()" },
  { id: "extra-wrong-start", text: "void Awake()" },
  { id: "extra-wrong-rotate", text: "transform.Rotate(Vector3.forward);" },
  { id: "extra-wrong-color", text: "GetComponent<Renderer>().material.color = Color.black;" },
  { id: "extra-wrong-destroy", text: "Destroy(other);" },
  { id: "extra-wrong-force", text: "rb.AddForce(Vector3.down * jumpForce);" },
  { id: "extra-wrong-input", text: "if (Input.GetKey(KeyCode.Return))" },
  { id: "extra-wrong-vector", text: "Vector3 move = Vector3.zero;" },
  { id: "extra-wrong-translate", text: "transform.Translate(Vector3.up * speed);" },
  { id: "extra-wrong-distance", text: "float distance = Time.deltaTime;" },
  { id: "extra-wrong-score", text: "score = 0;" },
  { id: "extra-wrong-tag", text: "if (other.CompareTag(\"Player\"))" },
  { id: "extra-wrong-null", text: "if (target == null)" },
  { id: "extra-wrong-random", text: "transform.position = Random.insideUnitSphere;" }
];
