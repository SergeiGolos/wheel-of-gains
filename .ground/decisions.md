# Wheel of Gains - Architectural Decisions & Constraints

**Key decisions, assumptions, and constraints that shape the project architecture and development approach.**

## Framework & Technology Decisions

### ADR-001: Migration to Qwik Framework
**Date**: August 2025  
**Context**: Initial POC was a single HTML file with React loaded via CDN  
**Decision**: Adopt Qwik Framework with TypeScript for modern development experience  
**Rationale**:
- Need for proper component architecture and build system
- GitHub Pages deployment requirements
- Performance benefits of resumable architecture
- Strong TypeScript support

**Constraints**:
- Learning curve for Qwik-specific patterns
- Limited ecosystem compared to React/Vue
- Static site generation requirement for GitHub Pages

### ADR-002: Tailwind CSS v4 for Styling
**Date**: Phase 1 Development  
**Context**: Need for consistent, maintainable styling system  
**Decision**: Use Tailwind CSS v4 with Vite integration  
**Rationale**:
- Utility-first approach reduces CSS bloat
- Built-in responsive design system
- Easy component composition
- Excellent developer experience

**Constraints**:
- v4 is cutting-edge, potential for breaking changes
- Requires build-time CSS processing
- Class name verbosity in templates

### ADR-003: HTML5 Canvas for Wheel Animation
**Date**: Core Feature Development  
**Context**: Need interactive spinning wheel with smooth animations  
**Decision**: Use HTML5 Canvas API instead of CSS/SVG animations  
**Rationale**:
- Fine-grained control over animation timing
- Better performance for complex animations
- Ability to implement custom physics
- Cross-browser consistency

**Constraints**:
- Accessibility challenges with canvas content
- Requires fallback for non-canvas environments
- More complex than CSS animations

## Deployment & Infrastructure Decisions

### ADR-004: GitHub Pages Static Deployment
**Date**: Project Setup  
**Context**: Need free, reliable hosting for demo application  
**Decision**: Use GitHub Pages with static site generation  
**Rationale**:
- Zero hosting costs
- Automatic deployments from main branch
- CDN distribution
- HTTPS by default

**Constraints**:
- Static hosting only (no server-side functionality)
- Limited to 1GB repository size
- Custom domain requires DNS configuration
- Base path requirement for repository hosting

### ADR-005: Client-Side Only Data Storage
**Date**: Privacy-First Design  
**Context**: User workout data needs persistence without server infrastructure  
**Decision**: Use browser Local Storage for all user data  
**Rationale**:
- No server infrastructure required
- Complete user privacy and data ownership
- Offline functionality
- No data breach risks

**Constraints**:
- Data limited to ~10MB per domain
- No cross-device synchronization
- Data loss if user clears browser data
- No collaborative features possible

## Testing & Quality Assurance Decisions

### ADR-006: Storybook + Playwright Testing Strategy
**Date**: Testing Infrastructure Setup  
**Context**: Need component testing and e2e validation  
**Decision**: Combine Storybook for component testing with Playwright for e2e  
**Rationale**:
- Storybook provides component isolation
- Playwright offers cross-browser testing
- Visual regression testing capabilities
- CI/CD integration

**Constraints**:
- Two testing frameworks to maintain
- Increased build complexity
- Higher CI resource usage

### ADR-007: Strict TypeScript Configuration
**Date**: Code Quality Standards  
**Context**: Need type safety and better developer experience  
**Decision**: Use strict TypeScript with no implicit any  
**Rationale**:
- Catch errors at compile time
- Better IDE support and refactoring
- Self-documenting code through types
- Easier maintenance and debugging

**Constraints**:
- Longer initial development time
- Learning curve for TypeScript patterns
- Additional configuration complexity

## Performance & UX Decisions

### ADR-008: Mobile-First Responsive Design
**Date**: UI/UX Design Phase  
**Context**: Fitness apps are primarily used on mobile devices  
**Decision**: Design mobile-first with progressive desktop enhancements  
**Rationale**:
- Primary use case is mobile gym usage
- Better mobile performance and experience
- Progressive enhancement approach
- Touch-optimized interactions

**Constraints**:
- Desktop experience may feel limited
- Complex interactions harder on mobile
- Screen real estate limitations

### ADR-009: Local-First with Progressive Enhancement
**Date**: Core Architecture Decision  
**Context**: App should work offline for gym environments  
**Decision**: Design app to function entirely client-side  
**Rationale**:
- Works in poor network conditions
- No server dependencies
- Faster load times after initial visit
- Better privacy and security

**Constraints**:
- No real-time collaboration features
- No cross-device data sync
- Limited analytics capabilities

## Development Process Decisions

### ADR-010: Automated CI/CD Pipeline
**Date**: DevOps Setup  
**Context**: Need consistent deployments and quality checks  
**Decision**: GitHub Actions for automated testing and deployment  
**Rationale**:
- Integrated with GitHub hosting
- Free for public repositories
- Comprehensive testing before deployment
- Automated quality gates

**Constraints**:
- GitHub Actions usage limits
- Complex pipeline configuration
- Dependency on GitHub ecosystem

### ADR-011: Component-First Development
**Date**: Architecture Planning  
**Context**: Need maintainable and reusable UI components  
**Decision**: Build reusable components with Storybook documentation  
**Rationale**:
- Better code reuse and consistency
- Visual component documentation
- Easier testing and debugging
- Clear component API boundaries

**Constraints**:
- Additional development overhead
- Storybook maintenance complexity
- Over-abstraction risks

## Security & Privacy Decisions

### ADR-012: No Analytics or Tracking
**Date**: Privacy Policy Decision  
**Context**: Fitness data is personal and sensitive  
**Decision**: No analytics, tracking, or data collection  
**Rationale**:
- Complete user privacy
- No GDPR/CCPA compliance requirements
- Builds user trust
- Simplified architecture

**Constraints**:
- No usage insights for optimization
- Difficult to measure feature success
- No error monitoring capabilities

### ADR-013: Content Security Policy
**Date**: Security Hardening  
**Context**: Need protection against XSS and injection attacks  
**Decision**: Implement strict CSP headers  
**Rationale**:
- Defense against common web attacks
- Required for PWA compliance
- Better security posture
- User protection

**Constraints**:
- May break some third-party integrations
- Debugging CSP violations can be complex
- Requires careful external resource management

## Technical Constraints & Assumptions

### Browser Compatibility
- **Assumption**: Users have modern browsers (2021+)
- **Constraint**: No Internet Explorer support
- **Impact**: Can use modern JavaScript features without polyfills

### Device Capabilities
- **Assumption**: Touch and mouse interaction support
- **Constraint**: Canvas requires JavaScript enabled
- **Impact**: Graceful degradation for accessibility

### Network Conditions
- **Assumption**: Initial load requires internet connection
- **Constraint**: Offline functionality after first visit
- **Impact**: Static asset optimization critical

### Data Volume
- **Assumption**: Workout data remains under 1MB per user
- **Constraint**: Local Storage 10MB limit per domain
- **Impact**: No video or large media storage

## Future Architecture Considerations

### Potential Breaking Changes
- Qwik framework major version updates
- Tailwind CSS v5 migration requirements
- Browser API deprecations (Canvas, Local Storage)
- GitHub Pages policy changes

### Scalability Assumptions
- User base remains individual fitness enthusiasts
- No enterprise or team features required
- Static hosting remains sufficient
- No real-time features needed

### Technical Debt
- Canvas accessibility needs improvement
- Component prop interfaces need standardization
- Test coverage could be expanded
- Performance monitoring should be added

---

*These decisions reflect the project's evolution from a simple POC to a production-ready fitness application. Each decision prioritizes user privacy, performance, and maintainability within the constraints of static hosting and client-side architecture.*