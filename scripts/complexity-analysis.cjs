#!/usr/bin/env node

/**
 * Complexity Analysis Tool for Wheel of Gains
 *
 * This script analyzes the codebase and generates complexity metrics
 * for individual files and components.
 */

const fs = require("fs");
const path = require("path");

// Configuration
const SRC_DIR = path.join(__dirname, "..", "src");
const OUTPUT_FILE = path.join(__dirname, "..", "COMPLEXITY_ANALYSIS.md");

// File extensions to analyze
const EXTENSIONS = [".tsx", ".ts"];

// Complexity thresholds
const COMPLEXITY_THRESHOLDS = {
  SIMPLE: { lines: 50, functions: 5, dependencies: 3 },
  MEDIUM: { lines: 150, functions: 15, dependencies: 8 },
  COMPLEX: { lines: 300, functions: 25, dependencies: 15 },
  // Anything above COMPLEX is HIGH_COMPLEXITY
};

class ComplexityAnalyzer {
  constructor() {
    this.files = [];
    this.totalStats = {
      files: 0,
      lines: 0,
      functions: 0,
      components: 0,
      imports: 0,
    };
  }

  /**
   * Get all TypeScript files in the src directory
   */
  getFiles(dir = SRC_DIR) {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...this.getFiles(fullPath));
      } else if (EXTENSIONS.includes(path.extname(item))) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * Analyze a single file for complexity metrics
   */
  analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    const relativePath = path.relative(SRC_DIR, filePath);

    // Basic metrics
    const totalLines = lines.length;
    const codeLines = lines.filter((line) => {
      const trimmed = line.trim();
      return (
        trimmed &&
        !trimmed.startsWith("//") &&
        !trimmed.startsWith("/*") &&
        !trimmed.startsWith("*")
      );
    }).length;

    // Count imports
    const importLines = lines.filter(
      (line) => line.trim().startsWith("import ") || line.includes("from "),
    );
    const importCount = importLines.length;

    // Count functions and components
    const functionMatches =
      content.match(
        /(?:function\s+\w+|const\s+\w+\s*=\s*\$?\(|^\s*\w+\s*:\s*\$?\()/gm,
      ) || [];
    const componentMatches =
      content.match(/export\s+const\s+\w+\s*=\s*component\$/gm) || [];
    const hookMatches = content.match(/use\w+\(/gm) || [];

    // Count conditional complexity (if, switch, ternary, loops)
    const conditionalMatches =
      content.match(/\b(if|switch|for|while|\?|\&\&|\|\|)\b/gm) || [];

    // Count JSX complexity
    const jsxElements = content.match(/<\w+/gm) || [];
    const eventHandlers = content.match(/on\w+\$?=/gm) || [];

    // Dependencies (unique imports)
    const dependencies = new Set();
    importLines.forEach((line) => {
      const match = line.match(/from\s+['"]([^'"]+)['"]/);
      if (match) {
        dependencies.add(match[1]);
      }
    });

    // Calculate complexity score
    const complexityScore = this.calculateComplexityScore({
      codeLines,
      functionCount: functionMatches.length,
      conditionalCount: conditionalMatches.length,
      jsxElementCount: jsxElements.length,
      dependencyCount: dependencies.size,
      hookCount: hookMatches.length,
    });

    const analysis = {
      path: relativePath,
      fullPath: filePath,
      totalLines,
      codeLines,
      importCount,
      functionCount: functionMatches.length,
      componentCount: componentMatches.length,
      hookCount: hookMatches.length,
      conditionalCount: conditionalMatches.length,
      jsxElementCount: jsxElements.length,
      eventHandlerCount: eventHandlers.length,
      dependencyCount: dependencies.size,
      dependencies: Array.from(dependencies),
      complexityScore,
      complexityLevel: this.getComplexityLevel(
        complexityScore,
        codeLines,
        functionMatches.length,
        dependencies.size,
      ),
    };

    return analysis;
  }

  /**
   * Calculate complexity score based on multiple factors
   */
  calculateComplexityScore(metrics) {
    const {
      codeLines,
      functionCount,
      conditionalCount,
      jsxElementCount,
      dependencyCount,
      hookCount,
    } = metrics;

    // Weighted complexity calculation
    let score = 0;

    // Lines of code (weight: 1)
    score += codeLines * 1;

    // Functions (weight: 3)
    score += functionCount * 3;

    // Conditional complexity (weight: 2)
    score += conditionalCount * 2;

    // JSX complexity (weight: 1.5)
    score += jsxElementCount * 1.5;

    // Dependencies (weight: 2)
    score += dependencyCount * 2;

    // React hooks usage (weight: 1.5)
    score += hookCount * 1.5;

    return Math.round(score);
  }

  /**
   * Determine complexity level based on metrics
   */
  getComplexityLevel(score, lines, functions, dependencies) {
    if (
      lines <= COMPLEXITY_THRESHOLDS.SIMPLE.lines &&
      functions <= COMPLEXITY_THRESHOLDS.SIMPLE.functions &&
      dependencies <= COMPLEXITY_THRESHOLDS.SIMPLE.dependencies
    ) {
      return "SIMPLE";
    }

    if (
      lines <= COMPLEXITY_THRESHOLDS.MEDIUM.lines &&
      functions <= COMPLEXITY_THRESHOLDS.MEDIUM.functions &&
      dependencies <= COMPLEXITY_THRESHOLDS.MEDIUM.dependencies
    ) {
      return "MEDIUM";
    }

    if (
      lines <= COMPLEXITY_THRESHOLDS.COMPLEX.lines &&
      functions <= COMPLEXITY_THRESHOLDS.COMPLEX.functions &&
      dependencies <= COMPLEXITY_THRESHOLDS.COMPLEX.dependencies
    ) {
      return "COMPLEX";
    }

    return "HIGH_COMPLEXITY";
  }

  /**
   * Run the complete analysis
   */
  analyze() {
    console.log("🔍 Starting complexity analysis...");

    const filePaths = this.getFiles();
    console.log(`📁 Found ${filePaths.length} TypeScript files`);

    for (const filePath of filePaths) {
      const analysis = this.analyzeFile(filePath);
      this.files.push(analysis);

      // Update total stats
      this.totalStats.files++;
      this.totalStats.lines += analysis.codeLines;
      this.totalStats.functions += analysis.functionCount;
      this.totalStats.components += analysis.componentCount;
      this.totalStats.imports += analysis.importCount;
    }

    // Sort files by complexity score
    this.files.sort((a, b) => b.complexityScore - a.complexityScore);

    console.log("✅ Analysis complete!");
    return this.files;
  }

  /**
   * Generate the complexity analysis report
   */
  generateReport() {
    const timestamp = new Date().toISOString();

    let report = `# Wheel of Gains - Complexity Analysis Report

*Generated on: ${timestamp}*

## Executive Summary

This document provides a comprehensive complexity analysis of the Wheel of Gains codebase. The project is acknowledged to be "heavily vibe coded" and this analysis aims to identify areas of high complexity that may benefit from refactoring.

### Key Metrics Overview

- **Total Files Analyzed**: ${this.totalStats.files}
- **Total Lines of Code**: ${this.totalStats.lines.toLocaleString()}
- **Total Functions**: ${this.totalStats.functions}
- **Total Components**: ${this.totalStats.components}
- **Total Import Statements**: ${this.totalStats.imports}

### Complexity Distribution

`;

    // Add complexity distribution
    const distribution = {
      SIMPLE: this.files.filter((f) => f.complexityLevel === "SIMPLE").length,
      MEDIUM: this.files.filter((f) => f.complexityLevel === "MEDIUM").length,
      COMPLEX: this.files.filter((f) => f.complexityLevel === "COMPLEX").length,
      HIGH_COMPLEXITY: this.files.filter(
        (f) => f.complexityLevel === "HIGH_COMPLEXITY",
      ).length,
    };

    report += `| Complexity Level | Count | Percentage |\n`;
    report += `|-----------------|-------|------------|\n`;
    Object.entries(distribution).forEach(([level, count]) => {
      const percentage = ((count / this.totalStats.files) * 100).toFixed(1);
      report += `| ${level.replace("_", " ")} | ${count} | ${percentage}% |\n`;
    });

    report += `\n## High Priority Areas for Refactoring

The following files have high complexity and should be prioritized for refactoring:

`;

    // Add high complexity files
    const highComplexityFiles = this.files.filter(
      (f) =>
        f.complexityLevel === "HIGH_COMPLEXITY" ||
        f.complexityLevel === "COMPLEX",
    );

    highComplexityFiles.forEach((file) => {
      report += `### ${file.path}
- **Complexity Score**: ${file.complexityScore}
- **Lines of Code**: ${file.codeLines}
- **Functions**: ${file.functionCount}
- **Components**: ${file.componentCount}
- **Dependencies**: ${file.dependencyCount}
- **Conditional Statements**: ${file.conditionalCount}
- **JSX Elements**: ${file.jsxElementCount}

`;
    });

    report += `## Complete File Analysis

The following table shows all files sorted by complexity score:

| File | Complexity Level | Score | Lines | Functions | Components | Dependencies |
|------|-----------------|-------|--------|-----------|------------|-------------|
`;

    this.files.forEach((file) => {
      report += `| \`${file.path}\` | ${file.complexityLevel} | ${file.complexityScore} | ${file.codeLines} | ${file.functionCount} | ${file.componentCount} | ${file.dependencyCount} |\n`;
    });

    report += `\n## Detailed Component Analysis

`;

    // Group by component type
    const componentFiles = this.files.filter((f) => f.componentCount > 0);
    const utilityFiles = this.files.filter((f) => f.path.includes("utils/"));
    const routeFiles = this.files.filter((f) => f.path.includes("routes/"));

    report += `### React Components (${componentFiles.length} files)

These files contain React components and represent the core UI logic:

`;

    componentFiles.forEach((file) => {
      report += `#### \`${file.path}\`
- **Complexity Level**: ${file.complexityLevel}
- **Complexity Score**: ${file.complexityScore}
- **Analysis**:
  - Lines of Code: ${file.codeLines}
  - Functions: ${file.functionCount}
  - Components: ${file.componentCount}
  - React Hooks: ${file.hookCount}
  - Event Handlers: ${file.eventHandlerCount}
  - JSX Elements: ${file.jsxElementCount}
  - Dependencies: ${file.dependencyCount}

`;
    });

    report += `### Utility Files (${utilityFiles.length} files)

Core business logic and utility functions:

`;

    utilityFiles.forEach((file) => {
      report += `#### \`${file.path}\`
- **Complexity Level**: ${file.complexityLevel}
- **Functions**: ${file.functionCount}
- **Lines**: ${file.codeLines}
- **Dependencies**: ${file.dependencyCount}

`;
    });

    report += `### Route Files (${routeFiles.length} files)

Page-level components and routing:

`;

    routeFiles.forEach((file) => {
      report += `#### \`${file.path}\`
- **Complexity Level**: ${file.complexityLevel}
- **Score**: ${file.complexityScore}
- **Lines**: ${file.codeLines}

`;
    });

    report += `## Recommendations

Based on this analysis, here are key recommendations for improving code maintainability:

### Immediate Action Required (High Complexity)

`;

    const highPriorityFiles = this.files.filter(
      (f) => f.complexityLevel === "HIGH_COMPLEXITY",
    );

    if (highPriorityFiles.length > 0) {
      highPriorityFiles.forEach((file) => {
        report += `1. **\`${file.path}\`** (Score: ${file.complexityScore})
   - Consider breaking down into smaller components
   - Extract reusable utility functions
   - Simplify conditional logic where possible
   - Reduce the number of dependencies if feasible

`;
      });
    } else {
      report += `✅ No files currently exceed the high complexity threshold.

`;
    }

    report += `### Medium Priority (Complex)

`;

    const mediumPriorityFiles = this.files.filter(
      (f) => f.complexityLevel === "COMPLEX",
    );

    if (mediumPriorityFiles.length > 0) {
      mediumPriorityFiles.forEach((file) => {
        report += `- **\`${file.path}\`**: Monitor for growth, consider refactoring if complexity increases
`;
      });
    } else {
      report += `✅ No files in the complex category.

`;
    }

    report += `### General Recommendations

1. **Component Decomposition**: Large components should be broken into smaller, focused components
2. **Custom Hooks**: Extract stateful logic into custom hooks for reusability
3. **Utility Functions**: Move pure functions to utility files
4. **Constants**: Extract magic numbers and strings to constants files
5. **Type Definitions**: Consider moving complex type definitions to separate files

### Code Quality Best Practices

1. **Single Responsibility**: Each component should have one clear purpose
2. **DRY Principle**: Eliminate code duplication where possible
3. **Error Boundaries**: Add error handling for complex components
4. **Testing**: Prioritize testing for high-complexity components
5. **Documentation**: Add JSDoc comments for complex functions

## Methodology

This analysis uses the following metrics to calculate complexity:

- **Lines of Code**: Raw indicator of file size
- **Function Count**: Number of functions/methods (weight: 3x)
- **Conditional Complexity**: If/switch/ternary statements (weight: 2x)
- **JSX Complexity**: Number of JSX elements (weight: 1.5x)
- **Dependencies**: External imports (weight: 2x)
- **Hook Usage**: React hooks usage (weight: 1.5x)

### Complexity Levels

- **SIMPLE**: ≤50 lines, ≤5 functions, ≤3 dependencies
- **MEDIUM**: ≤150 lines, ≤15 functions, ≤8 dependencies  
- **COMPLEX**: ≤300 lines, ≤25 functions, ≤15 dependencies
- **HIGH_COMPLEXITY**: Exceeds complex thresholds

---

*This analysis was generated automatically. For questions or suggestions about the methodology, please open an issue.*
`;

    return report;
  }

  /**
   * Save the report to file
   */
  saveReport(report) {
    fs.writeFileSync(OUTPUT_FILE, report, "utf8");
    console.log(`📄 Report saved to: ${OUTPUT_FILE}`);
  }
}

// Run the analysis
if (require.main === module) {
  const analyzer = new ComplexityAnalyzer();
  analyzer.analyze();
  const report = analyzer.generateReport();
  analyzer.saveReport(report);

  console.log("\n🎯 Complexity Analysis Summary:");
  console.log(`📊 Files by complexity level:`);

  const levels = ["HIGH_COMPLEXITY", "COMPLEX", "MEDIUM", "SIMPLE"];
  levels.forEach((level) => {
    const count = analyzer.files.filter(
      (f) => f.complexityLevel === level,
    ).length;
    if (count > 0) {
      console.log(`   ${level.replace("_", " ")}: ${count} files`);
    }
  });

  console.log(`\n🔥 Most complex files:`);
  analyzer.files.slice(0, 5).forEach((file, index) => {
    console.log(
      `   ${index + 1}. ${file.path} (Score: ${file.complexityScore})`,
    );
  });
}

module.exports = ComplexityAnalyzer;
