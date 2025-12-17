```md
# AutoSpectre Test Rules

## Framework
- Use Playwright with TypeScript
- Enforce Page Object Model
- Use async/await

## Assertions
- Use expect only
- Validate navigation, visibility, and content

## Flow Priority
1. Authentication
2. Search
3. Add to Cart
4. Checkout

## Code Standards
- No hard waits
- Use role or data-test-id selectors
- Add test.step for each action

## Naming
- Spec: feature.spec.ts
- Test: [FLOW] should [expected result]
```