export default function disposables() {
  const disposables = []

  function dispose() {
    disposables.splice(0).forEach((dispose) => dispose())
  }

  function add(cb) {
    disposables.push(cb)

    return () => {
      const index = disposables.indexOf(cb)
      if (index !== -1) disposables.splice(index, 1)
    }
  }

  return {
    add,
    dispose,
  }
}

export const shared = disposables()
