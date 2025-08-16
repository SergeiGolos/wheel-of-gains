# 🏛️ Architectural Decision Records (ADRs)

This document captures the major architectural decisions made during the evolution of Wheel of Gains from a proof-of-concept to a production-ready application.

## Decision Record Format

Each decision follows this structure:
- **Status**: [Accepted/Deprecated/Superseded]
- **Context**: What prompted this decision
- **Decision**: What was decided
- **Consequences**: Results and trade-offs

---

## ADR-001: Migration from HTML/React CDN to Qwik Framework

**Status**: Accepted (Issue #4, August 2025)

**Context**: 
- Initial POC was a single HTML file with React loaded via CDN
- Needed proper build system, routing, and component architecture
- Required GitHub Pages deployment capability

**Decision**: 
- Migrate to Qwik Framework with TypeScript
- Implement file-based routing with Qwik City
- Configure Vite as the build system
- Set up Static Site Generation for GitHub Pages

**Consequences**:
- ✅ Modern development experience with hot reload
- ✅ TypeScript support for better code quality  
- ✅ Resumable architecture for better performance
- ✅ Proper component architecture
- ✅ Automated builds and deployments
- ⚠️ Learning curve for team members
- ⚠️ More complex build process than simple HTML

---

## ADR-002: Tailwind CSS v4 for Styling

**Status**: Accepted (Phase 1)

**Context**:
- Needed consistent, maintainable styling system
- Required responsive design capabilities
- Wanted modern CSS practices

**Decision**:
- Adopt Tailwind CSS v4 (latest version)
- Use utility-first CSS approach
- Configure with Vite integration

**Consequences**:
- ✅ Rapid UI development with utility classes
- ✅ Consistent design system
- ✅ Responsive design capabilities
- ✅ Small production CSS bundles
- ⚠️ Initial learning curve for utility-first approach

---

## ADR-003: File-Based Routing with Multiple Workout Categories

**Status**: Accepted (Issue #12, August 2025)

**Context**:
- Single workout category was limiting user experience
- Users wanted different difficulty levels and exercise types
- Needed scalable way to add new workout categories

**Decision**:
- Implement file-based routing in `/src/routes/`
- Create dedicated pages for: Beginner, Intermediate, Advanced, Cardio, Strength
- Extract reusable `WorkoutWheelPage` component
- Each route defines its own workout collection

**Consequences**:
- ✅ Multiple workout categories available
- ✅ Easy to add new categories
- ✅ Clean URL structure
- ✅ Reusable component architecture
- ✅ Better user experience with specialized workouts

---

## ADR-004: Local Storage for Data Persistence

**Status**: Accepted (Issue #2, August 2025)

**Context**:
- Users wanted to customize workout lists
- Needed to persist spin history
- Required offline capability
- No server-side infrastructure available

**Decision**:
- Use browser localStorage for data persistence
- Implement workout management with CRUD operations
- Store spin history with timestamps
- Provide import/export functionality

**Consequences**:
- ✅ No server infrastructure required
- ✅ Offline functionality
- ✅ Fast data access
- ✅ User-specific customizations
- ⚠️ Data limited to single browser/device
- ⚠️ Data can be lost if browser storage is cleared

---

## ADR-005: Storybook for Component Documentation and Testing

**Status**: Accepted (Issues #61, #65, August 2025)

**Context**:
- Growing component library needed documentation
- Manual testing was becoming difficult
- Needed visual regression testing capability
- Required component development in isolation

**Decision**:
- Implement Storybook 8.x (upgrade to 9.x had compatibility issues)
- Create comprehensive stories for all components
- Integrate Playwright for automated testing
- Deploy Storybook alongside main application

**Consequences**:
- ✅ Visual component documentation
- ✅ Component development in isolation
- ✅ Interactive testing capabilities
- ✅ Automated visual regression testing
- ✅ Better developer experience
- ⚠️ Additional build complexity
- ⚠️ Maintenance overhead for stories

---

## ADR-006: Comprehensive CI/CD Pipeline with Automated Testing

**Status**: Accepted (Issues #71, #80, #84, August 2025)

**Context**:
- Manual testing was insufficient for growing codebase
- Needed reliable deployment pipeline
- Required quality gates before production
- Multiple contributors needed consistent testing

**Decision**:
- Implement GitHub Actions workflow with three jobs: test, build, deploy
- Block deployment if tests fail
- Use Playwright for component testing via Storybook
- Generate build artifacts with version information
- Integrate Storybook deployment with main application

**Consequences**:
- ✅ Reliable automated deployments
- ✅ Quality gates prevent broken releases
- ✅ Comprehensive test coverage
- ✅ Version tracking and artifact management
- ✅ Developer confidence in changes
- ⚠️ Longer deployment times due to testing
- ⚠️ Increased CI/CD complexity

---

## ADR-007: Compressed Workout Data URLs (Zip Encoding)

**Status**: Accepted (Issue #54, August 2025)

**Context**:
- Users wanted to share custom workout configurations
- Needed way to encode complex workout data in URLs
- Required backward compatibility with existing features

**Decision**:
- Implement base64 + gzip compression for workout data
- Create `/zip` route that accepts compressed data in query parameters
- Maintain separate encoding/decoding utilities
- Generate test collections for validation

**Consequences**:
- ✅ Shareable workout configurations via URLs
- ✅ Compact data representation
- ✅ No server storage required
- ✅ Backward compatible with existing features
- ⚠️ Complex encoding/decoding logic
- ⚠️ URL length limitations for very large datasets

---

## ADR-008: Code Quality and Complexity Management

**Status**: Accepted (Issue #55, August 2025)

**Context**:
- Project described as "heavily vibe coded"
- Technical debt accumulating
- Needed objective code quality metrics
- Required refactoring guidance

**Decision**:
- Implement automated complexity analysis
- Generate `COMPLEXITY_ANALYSIS.md` reports
- Set complexity thresholds for components
- Provide refactoring recommendations

**Consequences**:
- ✅ Objective code quality metrics
- ✅ Identify refactoring priorities
- ✅ Track code quality over time
- ✅ Guide technical debt reduction
- ⚠️ Additional tooling maintenance
- ⚠️ Analysis overhead in build process

---

## Deprecated Decisions

### ~~ADR-009: Jest + React Testing Library~~

**Status**: Superseded by ADR-005 (Storybook + Playwright)

**Context**: Initially planned to use Jest for testing

**Decision**: Superseded by Storybook + Playwright approach which provides better visual testing and component documentation

---

## Future Architectural Considerations

### Under Consideration

1. **Progressive Web App (PWA)**: Offline capabilities and mobile app-like experience
2. **Analytics Integration**: User behavior tracking and performance monitoring  
3. **Social Features**: Workout sharing and community features
4. **Timer Integration**: Built-in workout timing functionality
5. **Backend API**: User accounts and cross-device synchronization

### Constraints

- **GitHub Pages Deployment**: Static site generation required
- **No Server Costs**: Solutions must work without server infrastructure
- **Browser Compatibility**: Must work across modern browsers
- **Mobile Responsive**: Touch-friendly interface required

---

## Decision Making Process

1. **Issue Creation**: Technical decisions start as GitHub issues
2. **Research & Discussion**: Explore alternatives and trade-offs
3. **Prototyping**: Test approaches when needed
4. **Documentation**: Record decision and rationale
5. **Implementation**: Execute with monitoring for consequences
6. **Review**: Evaluate outcomes and adjust if needed

---

**Last Updated**: August 2025  
**Maintained By**: Project contributors  
**Review Cycle**: Updated with major architectural changes