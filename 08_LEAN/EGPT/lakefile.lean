import Lake
open Lake DSL

package «egpt» where
  leanOptions := #[
    ⟨`autoImplicit, false⟩
  ]

@[default_target]
lean_lib InformationTheory where
  srcDir := "."

require mathlib from git "https://github.com/leanprover-community/mathlib4.git" @ "7175569c842f9164564bd76ff8b207e7b4705522"
