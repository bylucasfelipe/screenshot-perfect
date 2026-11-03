<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep educational observation fixtures and pure filtering, summary, and export logic in a browser-safe module; this makes provenance and indicator consistency independently testable.
- Keep additional demo windows and ESG scenario calculations in the observation data module while preserving the original observations as the laboratory input; this keeps existing rankings stable and cross-page values testable.
- Keep exploration filters, bands and comparison calculations in the browser-safe observation module, with shared selection owned by ObservatoryPanel and arbitrary drawing geometry isolated in ExplorationMap; this prevents map/chart divergence without implying geography.
- Keep shared data-nature explanations in one site component so analytical pages distinguish observations, simulations, estimates, and goals consistently.
- Use Radix Dialog for the full-screen small-screen navigation so focus containment, Escape dismissal, and restoration are managed accessibly.
- Keep laboratory fixtures and weighted ranking in a browser-safe pure module that reuses observatory inputs; this preserves input consistency and allows testing the didactic calculation without external services.
- Keep the ODS editorial section in a dedicated site component mounted by Impacto e ESG; this isolates the addition without restructuring existing indicators or navigation.
