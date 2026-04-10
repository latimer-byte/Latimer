# Vibe-Coding Documentation: MarketMosaic AI

This document outlines the AI-assisted journey of building MarketMosaic AI, showing how natural language prompts were used to architect, code, and iterate on the application.

## AI Architecture Strategy

The application was architected using a **Hook-Service-Component** pattern:
1.  **Hook (`useDeriv`)**: Manages the complex state of the Deriv WebSocket, handling connection, authentication, subscriptions, and message routing.
2.  **Service (`gemini.ts`)**: Encapsulates the AI logic, providing clean interfaces for market analysis and chat assistance.
3.  **Components**: Modular UI elements styled with Tailwind 4.0 utility classes, ensuring a consistent "Technical Dashboard" aesthetic.

## Prompt History & Iteration

### Phase 1: Scaffolding & Core Logic
**Prompt**: *"Build me an app basing on the following competition guide line... Use Deriv API... Leverage AI to architect... MarketMosaic"*
- **AI Action**: Initialized the project, set up shadcn/ui, and created the `useDeriv` hook to handle the base WebSocket connection.
- **Hurdle**: Deriv API requires an `app_id`.
- **Solution**: Used the default demo `app_id: 1089` for initial development, ensuring immediate connectivity.

### Phase 2: AI Integration
**Prompt**: *"Implement user-owned Deriv tokens... real trading... polished version"*
- **AI Action**: Created the `gemini.ts` service and integrated it into a dedicated `AIPanel`.
- **Iteration**: Initially, the AI analysis was static. I updated it to take the last 20 price ticks as context to provide a dynamic "Vibe Check".

### Phase 3: Trading Execution
**Prompt**: *"Connect TradeControls to placeTrade function..."*
- **AI Action**: Refined the `useDeriv` hook to handle `authorize`, `proposal`, and `buy` calls.
- **Debugging**: Realized that `buy` requires a `proposal_id`. Updated the hook to automatically request a proposal and then execute the buy once the proposal is received (MVP flow).

### Phase 4: UI/UX Polishing
**Prompt**: *"Update App.tsx with MarketMosaic layout..."*
- **AI Action**: Implemented a high-density grid layout. Used `motion` for smooth transitions in the AI panel and `recharts` for high-performance price visualization.

## AI-Assisted Troubleshooting

- **WebSocket State**: Managed the race condition where a user might try to subscribe before the socket is open by using a `ref` to track subscriptions and checking `readyState`.
- **Responsive Charts**: Used `ResponsiveContainer` from Recharts to ensure the trading chart looks great on both ultra-wide monitors and mobile devices.
- **Secure Tokens**: Ensured API tokens are handled in-memory and never logged or stored insecurely, following AI safety guidelines.

## Conclusion

MarketMosaic AI demonstrates the power of "Vibe-Coding"—using AI as a high-level architect while maintaining strict control over the technical execution and user experience.
