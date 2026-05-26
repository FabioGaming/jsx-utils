# JSX Utils

A zero dependency React library that adds [SolidJS](https://www.solidjs.com/) JSX-Node based control flow for UI designed to work in any React ecosystem by being platform & framework-agnostic

---

### Table of Contents

- [Basic Information](#1-basic-information)
- [Documentation](#2-documentation)
  - [Getting Started](#21-getting-started)
  - [Added JSX-Nodes with Examples](#22-added-jsx-nodes-with-examples)
  - [Examples](#23-examples)
- [AI Usage & Transparency](#3-ai-usage--transparency)

---

## 1. Basic Information

JSX Utils is designed to be a framework-agnostic, zero dependency library you can drop into any React project, be it React through a bundler like Vite or Webpack, NextJS or React Native, these components are pure React logic components and do not contain any platform specific UI nodes

JSX Utils was made to get rid of the annoying ternary based control flow in the UI, which just makes the JSX layer of React applications unreadable, instead JSX Utils sets on Solid's JSX-Node based UI control flow, as it is much more readable, easier to modify and overall better in terms of developer experience

---

## 2. Documentation

JSX-Utils features both this, as well as a built in documentation that you can view in any modern editor by hovering over the JSX-Nodes

### 2.1 Getting Started

To get started with JSX Utils you can install it both through NPM as well as GitHub's package registry

NPM Install (recommended): `npm install @fabiothefox/jsx-utils`

GitHub Install: `npm install @fabiogaming/jsx-utils --registry=https://npm.pkg.github.com`

**Note**
For GitHub the installation might require some additional steps, such as:

- Creating an `.npmrc` file with the following content: `@fabiogaming:registry=https://npm.pkg.github.com` at the root of your project
- Logging into the GitHub package registry: `npm login --registry=https://npm.pkg.github.com`

### 2.2 Added JSX-Nodes With Examples

#### Show

Conditionally renders children when `when` is truthy, otherwise renders `fallback`

```tsx
<Show when={user} fallback={<p>Loading...</p>}>
  <p>Welcome back!</p>
  ...
</Show>
```

#### Match

Renders children only when `when` is truthy.
**Note:** [Match](#match) is typically used inside [Switch](#switch). For standalone conditional rendering, consider [Show](#show).

```tsx
<Match when={isAdmin}>
  <p>Admin panel</p>
  ...
</Match>
```

#### Switch

Renders the children of the first [Match](#match) child whose `when` prop is truthy.

```tsx
<Switch>
  <Match when={status === "loading"}>Loading...</Match>
  <Match when={status === "success"}>Done!</Match>
  <Match when={status === "error"}>Something went wrong.</Match>
</Switch>
```

#### For

Renders a list by mapping each item to JSX with a render function.

```tsx
<For each={users}>
  {(user, index) => (
    <li key={user.id}>
      {index + 1}. {user.name}
    </li>
  )}
</For>
```

### 2.3 Examples

#### User Profile with Status

Display different UI based on fetch state without nested ternaries:

```tsx
function UserProfile({ userId }) {
  const [state, setState] = useState("loading");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser(userId)
      .then((data) => {
        setUser(data);
        setState("success");
      })
      .catch((err) => {
        setError(err);
        setState("error");
      });
  }, [userId]);

  return (
    <div>
      <Switch>
        <Match when={state === "loading"}>
          <p>Loading profile...</p>
        </Match>
        <Match when={state === "success"}>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </Match>
        <Match when={state === "error"}>
          <p>Failed to load profile: {error.message}</p>
        </Match>
      </Switch>
    </div>
  );
}
```

#### Task List with Empty State

Render a list with a fallback when empty:

```tsx
function TaskList({ tasks, filter }) {
  const filtered = tasks.filter((t) => t.status === filter);

  return (
    <div>
      <h3>Tasks ({filtered.length})</h3>
      <Show when={filtered.length > 0} fallback={<p>No tasks yet.</p>}>
        <ul>
          <For each={filtered}>
            {(task) => (
              <li key={task.id} className={task.completed ? "done" : ""}>
                {task.title}
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}
```

---

## 3. AI Usage & Transparency

Copilot has been utilized throughout this project to assist in:

- Code Reviews on Pull Requests as well as minor adjustments when issues were found in said PRs
- Writing parts of the documentation
- Clearing up confusions about concepts
- Writing the CI
- Slight assistance with mock data for Tests

  All other code as well as test logic has been **hand rolled**
