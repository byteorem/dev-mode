---
name: principle-model-the-domain
description: "Apply when writing stateful logic, or when code branches a lot or repeats a shape assumption across files. Encode the domain in a data structure instead of conditionals."
disable-model-invocation: true
---

# Model the Domain

Encode the domain in a data structure instead of scattering it across conditionals.

**Why:** a structure that matches the domain makes invalid states unrepresentable and deletes branches. Choosing it at write time is cheap. Recovering it later reads as a refactor and gets deferred.

**Pattern:** a state machine (states plus allowed transitions) instead of booleans and status checks; a lookup table or dictionary instead of a switch repeated across pages; a typed model instead of a `DataRow` or loose parameters; a discriminated union or small class hierarchy where kinds really differ; a module organized around one body of domain knowledge, not a phase such as load, validate, or save. When nothing fits, write down what must never happen and how the data is read, then pick the structure that encodes exactly that. Boring code is right when the shape is already clear, local, and unlikely to grow.

**Anti-patterns:** a feature that adds one more branch to an if/else chain; a second boolean that must stay in sync with the first; the same status-code check copied across files; an abstraction that adds indirection without removing a branch, a duplicated rule, or an invalid state.
