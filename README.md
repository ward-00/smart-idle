# 💤 smart-idle

**smart-idle** is a lightweight, customizable JavaScript library that detects user inactivity (idle state) in the browser. It helps you implement features like auto-logout, UI hiding, session timeout, or analytics triggers with ease.

- 🔧 Framework-agnostic (works with React, Vue, Angular, Vanilla JS, etc.)
- 🎛️ Fully customizable idle timeout and activity events
- 💡 Built-in event listeners and manual control methods
- 🧪 Minimal dependencies and small size

---

## 📦 Installation

### Using npm

```
npm install smart-idle
```

### Using CDN (for browser use)

```
<script type="module">
  import { SmartIdle } from 'https://cdn.jsdelivr.net/npm/smart-idle/+esm';

  const idle = new SmartIdle({ timeout: 10000 });
  idle.start();
</script>
```

---

## 🚀 Getting Started

### Basic Example

```
import { SmartIdle } from 'smart-idle';

const idle = new SmartIdle({
  timeout: 60000, // 1 minute
  onIdle: () => console.log('User is idle'),
  onActive: () => console.log('User is active again'),
});

idle.start();
```

---

## ⚙️ Configuration Options

When you create a `SmartIdle` instance, you can pass these options:

| Option     | Type       | Default                     | Description                              |
|------------|------------|-----------------------------|------------------------------------------|
| `timeout`  | `number`   | `60000` (ms)                | Time (in milliseconds) before becoming idle |
| `onIdle`   | `Function` | `() => {}`                  | Callback fired when user becomes idle    |
| `onActive` | `Function` | `() => {}`                  | Callback fired when user returns         |
| `events`   | `string[]` | See below                   | DOM events to listen to                  |

### Default `events` listened to:

```
[
  'mousemove',
  'scroll',
  'keydown',
  'touchstart',
  'visibilitychange'
]
```

You can override this like so:

```
const idle = new SmartIdle({
  timeout: 15000,
  events: ['click', 'keydown', 'pointermove'], // custom events
});
```

---

## 📚 API Reference

| Method           | Description                                     |
|------------------|-------------------------------------------------|
| `start()`        | Start tracking user activity                    |
| `stop()`         | Stop tracking and clear timers                  |
| `pause()`        | Temporarily pause idle tracking                 |
| `resume()`       | Resume tracking after pause                     |
| `reset()`        | Reset the internal idle timer                   |
| `destroy()`      | Remove all listeners and stop everything        |
| `triggerIdle()`  | Manually set the state to idle immediately      |

---

## 💡 Use Cases

- 🔐 Auto logout users after inactivity  
- 🛑 Pause video/audio when the user is idle  
- 🧼 Dim or hide UI after a period of no input  
- 📊 Trigger analytics or session tracking  
- 📉 Conserve resources in low-interaction tabs  

---

## 🔌 Framework Examples

### React

```
useEffect(() => {
  const idle = new SmartIdle({
    timeout: 10000,
    onIdle: () => console.log('Idle'),
    onActive: () => console.log('Active'),
  });

  idle.start();
  return () => idle.destroy();
}, []);
```

### Vue (Composition API)

```
onMounted(() => {
  const idle = new SmartIdle({
    timeout: 10000,
    onIdle: () => console.log("Idle"),
    onActive: () => console.log("Back"),
  });
  idle.start();
});

onUnmounted(() => idle.destroy());
```

---

## 🖥️ CLI Support (Optional)

This package comes with a CLI entry point for developer information.

### Install globally:

```
npm install -g smart-idle
```

### Use:

```
smart-idle --help
```

> ⚠️ Note: The CLI is informational only; this is not a Node-based runtime tool.

---

## 🌐 Browser Compatibility

| Browser       | Supported |
|---------------|-----------|
| Chrome        | ✅        |
| Firefox       | ✅        |
| Safari        | ✅        |
| Edge          | ✅        |
| Internet Explorer | ❌    |

> This library is **not designed** for Node.js usage.

---

## 📝 License

MIT License © 2025 ward-00