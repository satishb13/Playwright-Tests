# GenAI Playwright Testing Framework
## Framework Architecture & Design

---

## 1. Purpose

This framework is designed as a production-ready automation and validation framework for modern GenAI applications.

The framework will support testing and continuous validation of:

- Web UI applications
- REST APIs
- Chatbot applications
- RAG (Retrieval-Augmented Generation)
- LLM-based applications
- GenAI response quality
- Negative and guardrail scenarios
- AI evaluation using deterministic and AI-assisted evaluators

### Technology Stack

- Playwright
- TypeScript
- Node.js
- Playwright APIRequestContext
- JSON-based test data
- Environment-based configuration
- Page Object Model
- Playwright Fixtures
- Git / GitHub
- CI/CD
- DeepEval / AI evaluation tools (planned)

---

# 2. High-Level Architecture

                         TEST EXECUTION
                              |
                              v
                    +-------------------+
                    |   Playwright Test |
                    +-------------------+
                              |
          +-------------------+-------------------+
          |                   |                   |
          v                   v                   v
      UI Tests            API Tests          GenAI Tests
          |                   |                   |
          v                   v                   v
     uiFixture           apiFixture          aiFixture
          |                   |                   |
          v                   v          +--------+--------+
    Page Objects          API Classes    |        |        |
          |                   |          RAG      LLM   Evaluator
          v                   v
   ChatbotPage             BaseApi
                              |
                              v
                   Playwright APIRequestContext

---

# 3. Project Structure

GenAITestingFramework/
|
├── api/
│   ├── baseApi.ts
│   ├── claimsApi.ts
│   ├── policyApi.ts
│   └── ragApi.ts
│
├── data/
│   ├── insurancePrompts.json
│   ├── negativePrompts.json
│   └── policyData.json
│
├── environments/
│   ├── qa.json
│   ├── staging.json
│   └── prod.json
│
├── fixtures/
│   ├── testFixture.ts
│   ├── apiFixture.ts
│   ├── authFixture.ts
│   └── uiFixture.ts
│
├── hooks/
│   └── testHooks.ts
│
├── pages/
│   └── ChatbotPage.ts
│
├── tests/
│   ├── api/
│   │   ├── todos.spec.ts
│   │   └── todos-negative.spec.ts
│   │
│   ├── auth/
│   │   └── authFixture.spec.ts
│   │
│   ├── chatbot/
│   │   └── uiFixture.spec.ts
│   │
│   └── data/
│       ├── policyData.spec.ts
│       ├── promptData.spec.ts
│       ├── negativePromptData.spec.ts
│       └── testData.spec.ts
│
├── utils/
│   ├── aiEvaluator.ts
│   ├── apiValidator.ts
│   ├── environment.ts
│   ├── secrets.ts
│   └── testData.ts
│
├── docs/
│   └── FRAMEWORK_ARCHITECTURE.md
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .gitignore
└── package-lock.json

---

# 4. Directory Responsibilities

## api/

Contains reusable API implementation classes.

Examples:

- ClaimsApi
- PolicyApi
- RagApi

API implementation must not be placed under tests/.

---

## data/

Contains external test datasets.

Examples:

- Policy test data
- Positive prompts
- Negative prompts
- Expected responses
- Future RAG evaluation datasets

The goal is to separate test data from test logic.

---

## environments/

Contains environment-specific non-secret configuration.

Supported environments:

- QA
- Staging
- Production

Environment files:

- qa.json
- staging.json
- prod.json

Secrets must not be stored in these files.

---

## fixtures/

Contains Playwright fixtures used to initialize framework components.

Current fixtures:

- testFixture.ts
- apiFixture.ts
- authFixture.ts
- uiFixture.ts

Future:

- aiFixture.ts

---

## hooks/

Contains common test lifecycle hooks.

Examples:

- Before test
- After test
- Screenshot handling
- Logging
- Test metadata
- Failure handling

---

## pages/

Contains Page Object Model classes.

Example:

- ChatbotPage.ts

Page Objects contain:

- Locators
- UI actions
- Reusable UI workflows

Tests should not contain duplicated locators.

---

## tests/

Contains actual test specifications.

Tests should focus on:

- Test intent
- Test data
- Assertions
- Business validation

Infrastructure implementation should remain in fixtures, pages, API classes, and utilities.

---

## utils/

Contains reusable framework utilities.

Examples:

- environment.ts
- secrets.ts
- apiValidator.ts
- testData.ts
- aiEvaluator.ts

Future utilities may include:

- Response normalization
- RAG evaluation
- LLM evaluation
- Prompt utilities
- Logging
- Reporting
- Retry handling

---

# 5. API Architecture

The API layer follows an inheritance-based architecture.

                     BaseApi
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
      ClaimsApi      PolicyApi      RagApi

## BaseApi

Responsible for common API functionality:

- APIRequestContext
- Base URL
- GET
- POST
- Common request handling

Example:

protected async get(endpoint: string) {
  return this.request.get(
    `${this.baseUrl}${endpoint}`
  );
}

---

## ClaimsApi

Contains Claims-specific API operations.

Example:

getClaim(claimId: string)

---

## PolicyApi

Contains Policy-specific API operations.

Example:

getPolicy(policyId: string)

---

## RagApi

Contains RAG service operations.

Example:

retrieve(query: string)

---

# 6. Fixture Architecture

Fixtures provide reusable dependencies to tests.

## testFixture

Base framework fixture.

Provides:

- Environment configuration
- Common Playwright fixtures

Architecture:

testFixture
    |
    +-- environment

---

## apiFixture

Provides API clients.

apiFixture
    |
    +-- ClaimsApi
    +-- PolicyApi
    +-- RagApi

Tests can use:

test(
  'Get policy',
  async ({ policyApi }) => {
    // test
  }
);

---

## authFixture

Provides authentication capability.

Current authentication is intentionally a placeholder until the application's real authentication mechanism is available.

Potential implementations:

- UI login
- API authentication
- OAuth / SSO
- Playwright storageState

Authentication credentials must never be hard-coded.

---

## uiFixture

Provides Page Object instances.

Current UI fixture:

uiFixture
    |
    +-- ChatbotPage

Example:

test(
  'Chatbot UI test',
  async ({ chatbotPage }) => {
    // test
  }
);

---

# 7. Fixture Design Principle

Avoid creating a single "God Fixture" containing every dependency.

Do not create one fixture containing:

- API
- UI
- Authentication
- RAG
- LLM
- AI Evaluation

Instead, use specialized fixtures.

                     testFixture
                    /     |      \
                   /      |       \
                  v       v        v
                API      Auth       UI
                 |                  |
                 v                  v
            API Classes        ChatbotPage

Future:

                         testFixture
                        /     |      \
                       v      v       v
                     API    Auth       UI
                                     
                                       +
                                    aiFixture
                                       |
                             +---------+---------+
                             |         |         |
                            RAG       LLM    Evaluator

This keeps the framework modular and maintainable.

---

# 8. Page Object Model

The framework uses the Page Object Model.

Example:

ChatbotPage
    |
    +-- messageInput
    +-- sendButton
    +-- responseContainer

Responsibilities:

### Page Object

- Locators
- UI interactions
- Reusable workflows

### Test

- Business scenario
- Test data
- Assertions

Example:

test(
  'Chatbot responds to policy question',
  async ({ chatbotPage }) => {

    await chatbotPage.enterMessage(
      'What is covered by my policy?'
    );

    await chatbotPage.sendMessage();

    const response =
      await chatbotPage.getLatestResponse();

    expect(response).toBeTruthy();
  }
);

---

# 9. Environment Strategy

Supported environments:

- QA
- Staging
- Production

Environment selection is controlled using:

TEST_ENV

Architecture:

                     TEST_ENV
                        |
            +-----------+-----------+
            |           |           |
            v           v           v
           qa        staging       prod
            |           |           |
            v           v           v
        qa.json     staging.json   prod.json
            |           |           |
            +-----------+-----------+
                        |
                        v
                 environment.ts
                        |
                        v
             Playwright / API Layer

Example:

$env:TEST_ENV="qa"
npm test

or:

$env:TEST_ENV="staging"
npm test

or:

$env:TEST_ENV="prod"
npm test

Only one environment is selected for a test execution.

---

# 10. Environment Configuration

Environment JSON files contain only non-secret configuration.

Example:

{
  "name": "qa",
  "baseUrl": "",
  "apiBaseUrl": "",
  "ragApiBaseUrl": ""
}

The same structure is used for:

- qa.json
- staging.json
- prod.json

Actual application URLs will be populated when the corresponding environments are connected.

---

# 11. Secrets Management

Secrets must never be committed to Git.

Examples of secrets:

- TEST_USERNAME
- TEST_PASSWORD
- TEST_API_KEY
- TEST_CLIENT_SECRET

Secrets are accessed through:

utils/secrets.ts

Architecture:

GitHub Secrets / Environment Variables
                |
                v
          secrets.ts
                |
                v
       Authentication / APIs

Never store credentials directly inside:

- *.json
- *.ts
- *.spec.ts

---

# 12. Test Data Strategy

Test data is separated from test logic.

Architecture:

JSON Dataset
     |
     v
Typed Data Loader
     |
     v
Playwright Test

Current datasets:

- policyData.json
- insurancePrompts.json
- negativePrompts.json

This enables data-driven testing.

Example:

Policy Data
    |
    +-- POL001
    +-- POL002
    +-- POL003

A new dataset entry should automatically produce a new test iteration.

---

# 13. GenAI Test Data Strategy

GenAI datasets will eventually contain:

- Prompt
- Category
- Expected Topics
- Expected Behavior
- Evaluation Criteria

Example:

{
  "id": "RAG001",
  "category": "policy",
  "prompt": "What is covered under my policy?",
  "expectedTopics": [
    "coverage",
    "policy type"
  ]
}

Future evaluation metadata may include:

{
  "evaluation": {
    "minimumRelevance": 0.8,
    "minimumFaithfulness": 0.8
  }
}

---

# 14. Negative Testing Strategy

Negative scenarios are independently tagged.

Examples:

@api @negative @regression

@data @negative @regression

Negative testing will eventually cover:

- Invalid inputs
- Unsupported questions
- Out-of-domain prompts
- Hallucination scenarios
- Unsafe prompts
- Missing context
- RAG retrieval failures
- LLM guardrail validation

---

# 15. Test Tags

The framework uses two dimensions of tags.

## Domain Tags

- @api
- @chatbot
- @rag
- @llm
- @data

These describe what is being tested.

## Execution Tags

- @smoke
- @regression
- @negative

These describe why/when the test should execute.

## Examples

@api @smoke

API smoke test.

@api @negative @regression

Negative API regression test.

@chatbot @smoke

Chatbot smoke test.

@rag @negative @regression

Negative RAG regression test.

---

# 16. Current Test Commands

The framework currently supports:

npm test

Run all tests.

npm run typecheck

Run TypeScript validation.

npm run test:smoke

Run smoke tests.

npm run test:regression

Run regression tests.

npm run test:api

Run API tests.

npm run test:chatbot

Run chatbot tests.

npm run test:rag

Run RAG tests.

npm run test:llm

Run LLM tests.

npm run test:negative

Run negative tests.

npm run test:headed

Run headed browser tests.

npm run test:debug

Run tests in debug mode.

npm run test:report

Open the Playwright HTML report.

---

# 17. Production Execution Strategy

Production execution must be more restrictive than QA and Staging.

## QA

Recommended:

- Smoke
- API
- UI
- Chatbot
- RAG
- LLM
- Regression
- Negative

## Staging

Recommended:

- Smoke
- API
- UI
- Chatbot
- RAG
- LLM
- Regression
- Negative

## Production

Recommended:

- Smoke
- Critical API
- Critical UI
- Critical Chatbot
- Critical RAG

Avoid running broad regression or experimental AI evaluation suites against production by default.

---

# 18. GenAI Testing Architecture

The future GenAI architecture will be:

                       Prompt Dataset
                             |
                             v
                      Chatbot / Agent
                             |
              +--------------+--------------+
              |                             |
              v                             v
        Retrieved Context             LLM Response
              |                             |
              +--------------+--------------+
                             |
                             v
                      AI Evaluation
                             |
                +------------+------------+
                |            |            |
                v            v            v
            Relevance   Faithfulness   Safety
                |            |            |
                +------------+------------+
                             |
                             v
                         PASS / FAIL

---

# 19. RAG Testing Strategy

RAG validation will cover:

## Retrieval

- Relevant documents retrieved
- Top-K validation
- Metadata validation
- Retrieval ranking

## Grounding

- Response based on retrieved context
- No unsupported claims
- No hallucinated facts

## Answer Quality

- Relevance
- Completeness
- Correctness

## Failure Scenarios

- No documents found
- Irrelevant documents
- Missing context
- Conflicting information

---

# 20. LLM Testing Strategy

LLM testing will eventually cover:

- Response relevance
- Response correctness
- Hallucination
- Toxicity
- Safety
- Prompt injection
- Refusal behavior
- Instruction following
- Consistency
- Structured output validation

AI evaluation frameworks such as DeepEval may be integrated into this layer.

---

# 21. AI Evaluation Layer

The AI evaluator will remain separate from ordinary Playwright assertions.

Architecture:

Playwright Test
      |
      v
Application Response
      |
      v
AI Evaluator
      |
      +-- Relevance
      +-- Faithfulness
      +-- Correctness
      +-- Safety
      +-- Hallucination
      |
      v
Evaluation Result
      |
      v
PASS / FAIL

This separation allows functional UI/API validation and AI-quality validation to evolve independently.

---

# 22. CI/CD Strategy

The framework will eventually support CI/CD execution through GitHub Actions or another CI platform.

## Pull Request

Recommended:

- Typecheck
- Lint
- Smoke
- API Smoke
- Critical UI

The goal is fast feedback.

## QA Pipeline

Recommended:

- Typecheck
- Smoke
- API
- UI
- Chatbot
- RAG
- LLM
- Regression
- Negative

## Staging Pipeline

Recommended:

- Typecheck
- Smoke
- API
- UI
- Chatbot
- RAG
- LLM
- Regression
- Negative

## Production Pipeline

Recommended:

- Typecheck
- Critical Smoke
- Critical API
- Critical UI
- Critical Chatbot
- Critical RAG

Production execution should have explicit approval or controlled deployment gates.

---

# 23. Git Strategy

The framework follows a feature-branch workflow.

Example:

main
 |
 +-- dev
       |
       +-- feature/add-api-test
       +-- feature/add-rag-evaluation
       +-- feature/add-llm-evaluation

Recommended flow:

Create feature branch
        |
        v
Develop
        |
        v
Run typecheck
        |
        v
Run targeted tests
        |
        v
Commit
        |
        v
Push feature branch
        |
        v
Pull Request
        |
        v
CI validation
        |
        v
Code Review
        |
        v
Merge

---

# 24. Commit Strategy

Commits should be small and meaningful.

Examples:

feat: add API fixture architecture

feat: add chatbot page object

feat: add RAG test data

feat: add negative prompt validation

feat: add AI evaluation layer

fix: correct environment loading

test: add policy API regression coverage

ci: add Playwright PR validation

Avoid large commits containing unrelated changes.

---

# 25. Framework Design Principles

The framework follows these principles:

1. Tests should contain test intent, not infrastructure setup.
2. API implementation belongs under api/.
3. Page Objects belong under pages/.
4. Test specifications belong under tests/.
5. Test data belongs under data/.
6. Reusable infrastructure belongs under fixtures/ and utils/.
7. Secrets must never be committed.
8. Environment selection must be configuration-driven.
9. Specialized fixtures are preferred over a single large fixture.
10. Functional testing and AI evaluation should remain logically separated.
11. Production execution must be safer than QA/Staging execution.
12. Tests should be deterministic wherever possible.
13. GenAI evaluations should use measurable evaluation criteria.
14. Test data should be externally configurable.
15. CI/CD should provide fast feedback for pull requests.
16. Framework changes should be backward-compatible whenever possible.

---

# 26. Current Architecture Status

The following foundation has been implemented:

                    Playwright + TypeScript
                              |
                              v
                       Environment Layer
                              |
                    +---------+---------+
                    |                   |
                    v                   v
                 UI Layer           API Layer
                    |                   |
                    v                   v
               ChatbotPage            BaseApi
                                         |
                              +----------+----------+
                              |          |          |
                              v          v          v
                           Claims     Policy       RAG
                              |
                              v
                           Fixtures
                              |
                    +---------+---------+---------+
                    |         |         |         |
                  Test       API       Auth       UI
                Fixture    Fixture    Fixture   Fixture

Test data:

- Policy
- Positive Prompts
- Negative Prompts

Execution tags:

- Smoke
- Regression
- Negative

Environment support:

- QA
- Staging
- Production

---

# 27. Planned Day 2 Architecture

The next phase will introduce the actual GenAI validation layer.

Target:

                     Playwright
                         |
              +----------+----------+
              |          |          |
             UI         API       GenAI
              |          |          |
              v          v          v
        ChatbotPage    API       AI Fixture
                                  /    |    \
                                 /     |     \
                               RAG     LLM   Evaluator
                                 \     |     /
                                  \    |    /
                                   AI Metrics
                                       |
                     +-----------------+-----------------+
                     |                 |                 |
                 Relevance       Faithfulness         Safety
                     |                 |                 |
                     +-----------------+-----------------+
                                       |
                                       v
                                   PASS / FAIL

The Day 2 implementation will focus on:

- RAG testing
- LLM testing
- Prompt validation
- Response validation
- AI evaluation
- DeepEval integration
- Hallucination detection
- Faithfulness
- Relevance
- Safety
- Guardrails
- CI/CD quality gates

---

# 28. Final Goal

The framework should provide a single automation platform for continuous validation of GenAI applications across:

                    APPLICATION
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
         UI             API          GenAI
          |              |              |
          v              v              v
     Playwright      API Tests       RAG / LLM
                                       |
                                       v
                                AI Evaluation
                                       |
                                       v
                                Quality Gates
                                       |
                                       v
                               CI/CD Pipeline
                                       |
                                       v
                              Production Ready

The objective is not only to verify whether the application works, but also to continuously validate whether the AI system produces:

- Relevant responses
- Grounded responses
- Faithful responses
- Correct responses
- Safe responses
- Reliable responses

---

# 29. Production Readiness Principles

Before a GenAI feature is considered production-ready, the framework should validate multiple quality dimensions.

## Functional Readiness

- UI functionality
- API functionality
- Authentication
- Error handling
- Regression coverage

## AI Readiness

- Retrieval quality
- Response relevance
- Faithfulness
- Grounding
- Hallucination resistance
- Safety
- Guardrails
- Prompt injection resistance

## Operational Readiness

- Environment configuration
- Secret management
- CI/CD execution
- Test reporting
- Logging
- Traceability
- Failure diagnostics

## Release Readiness

A release should pass the applicable:

- Smoke suite
- Regression suite
- API validation
- UI validation
- Chatbot validation
- RAG validation
- LLM validation
- AI evaluation quality gates

before production deployment.

---

# 30. Architecture Evolution

The framework will evolve incrementally.

### Phase 1 — Foundation

Completed:

- Playwright + TypeScript
- Project structure
- Environment management
- API layer
- Fixtures
- Page Object Model
- Test data
- Test tags
- Smoke / regression execution

### Phase 2 — GenAI Validation

Planned:

- RAG validation
- LLM validation
- Prompt testing
- Response evaluation
- DeepEval
- AI metrics

### Phase 3 — CI/CD

Planned:

- Pull Request validation
- QA pipeline
- Staging pipeline
- Production smoke pipeline
- Quality gates
- Test reporting

### Phase 4 — Enterprise Production Readiness

Planned:

- AI evaluation dashboards
- Trend analysis
- Evaluation thresholds
- Failure analytics
- Model comparison
- Prompt versioning
- Regression detection
- Automated quality gates

---

# 31. Final Architecture Vision

The final framework should provide:

UI Automation
       +
API Automation
       +
Chatbot Testing
       +
RAG Testing
       +
LLM Testing
       +
AI Evaluation
       +
CI/CD
       +
Production Quality Gates

Result:

             PRODUCTION-READY
               GENAI TESTING
                 PLATFORM

The framework is designed to validate not only whether the application functions correctly, but whether the GenAI system delivers reliable, relevant, grounded, safe, and production-ready responses.

---

# 32. Environment Execution Matrix

The framework uses environment-specific execution policies to prevent unsafe or unnecessary test execution.

## Pull Request

Environment:

QA

Execution:

- TypeScript typecheck
- Smoke tests
- Critical API smoke
- Critical UI smoke

Purpose:

Provide fast feedback during development and code review.

---

## QA Continuous Validation

Environment:

QA

Execution:

- Smoke
- Regression
- API
- UI
- Chatbot
- RAG
- LLM
- Negative

Purpose:

Validate the latest application changes continuously.

---

## Staging Validation

Environment:

Staging

Execution:

- Smoke
- Regression
- API
- UI
- Chatbot
- RAG
- LLM
- Negative
- AI evaluation

Purpose:

Perform complete pre-production validation.

---

## Production Validation

Environment:

Production

Execution:

- Critical smoke
- Critical API
- Critical UI
- Critical Chatbot
- Critical RAG

Purpose:

Validate production health while minimizing production risk.

Broad regression, experimental GenAI tests, destructive tests, and large evaluation datasets should not run against production by default.

---

## Environment Safety Rules

1. Pull Request execution must use QA.
2. Staging validation must use Staging.
3. Production tests must explicitly use Production.
4. Production execution must never depend on the default `TEST_ENV`.
5. Production suites must be explicitly tagged.
6. Experimental GenAI tests must not execute against Production by default.
7. Destructive tests must never execute against Production.
8. Credentials must be supplied through secure environment variables or CI secrets.
9. Environment-specific configuration must remain outside test logic.
10. CI pipelines must explicitly declare the target environment.