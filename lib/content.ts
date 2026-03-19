export interface ContentBlock {
  type: "h2" | "h3" | "p" | "code" | "ul" | "ol" | "callout" | "divider";
  content?: string;
  items?: string[];
  language?: string;
  variant?: "info" | "tip" | "warning";
}

export type ArticleContent = ContentBlock[];

const content: Record<string, ArticleContent> = {
  "power-apps-database-error-handling": [
    { type: "p", content: "Error handling is one of the most overlooked aspects of Power Apps development. When your Canvas App connects to Dataverse or SQL, silent failures can leave users confused and data in a broken state. In this guide we'll walk through every layer of error handling available to you." },
    { type: "h2", content: "Why Error Handling Matters" },
    { type: "p", content: "Without proper error handling, a failed Patch() call simply does nothing — no message, no rollback, no indication to the user. The record stays unsaved, the user clicks Submit again, and you end up with duplicates or partial writes." },
    { type: "callout", variant: "warning", content: "Power Apps does not throw exceptions the way traditional languages do. Errors are values — functions return error records you must inspect explicitly." },
    { type: "h2", content: "Using IfError()" },
    { type: "p", content: "IfError() is your primary safety net. It evaluates an expression and falls back to a default if an error occurs. Think of it as a try-catch that works inline." },
    { type: "code", language: "powerfx", content: `IfError(
  Patch(MyTable, Defaults(MyTable), { Title: txtTitle.Text }),
  Notify("Save failed: " & FirstError.Message, NotificationType.Error)
)` },
    { type: "h2", content: "The Errors() Function" },
    { type: "p", content: "After a Patch() or SubmitForm(), call Errors(MyTable) to inspect what went wrong. It returns a table of error records with columns: Column, Message, Kind, and Record." },
    { type: "code", language: "powerfx", content: `If(
  !IsEmpty(Errors(MyTable)),
  Notify(First(Errors(MyTable)).Message, NotificationType.Error)
)` },
    { type: "h2", content: "App.OnError — Global Handler" },
    { type: "p", content: "Set App.OnError to catch unhandled errors across your entire app. This is your last line of defence before the user sees a blank screen." },
    { type: "code", language: "powerfx", content: `// App.OnError
Notify(
  "Something went wrong. Please try again. (" & FirstError.Kind & ")",
  NotificationType.Error
)` },
    { type: "callout", variant: "tip", content: "Log errors to a Dataverse table inside App.OnError so you can audit failures in production without relying on users to report them." },
    { type: "h2", content: "Handling Delegation Errors" },
    { type: "p", content: "Delegation warnings are compile-time, not runtime — but when a non-delegable query silently truncates results at 500 or 2000 records, users get wrong data without any error. Combine server-side filtering with client-side fallbacks." },
    { type: "ul", items: ["Use Filter() with delegable columns (indexed Dataverse columns)", "Avoid In, StartsWith on non-text fields", "Use CountRows(Filter(...)) server-side to detect truncation", "Fall back to a warning banner if CountRows exceeds your limit"] },
    { type: "h2", content: "Putting It All Together" },
    { type: "p", content: "A production-ready save button combines IfError, form validation, and a loading spinner to give the user a clear, trustworthy experience every time — whether the operation succeeds or fails." },
    { type: "divider" },
    { type: "p", content: "Good error handling turns a frustrating app into a reliable tool. Invest the time upfront and your users — and your future self — will thank you." },
  ],

  "claude-power-platform-autonomous": [
    { type: "p", content: "Anthropic's Claude is no longer just a code assistant — with the Computer Use capability and Claude Code, it can take autonomous control of your desktop, browser, and development environment. For Power Platform developers, this opens a genuinely new way to build." },
    { type: "h2", content: "What 'Autonomous' Actually Means" },
    { type: "p", content: "Claude Code uses a loop of perception, reasoning, and action. It reads your screen, understands context, decides what to do, then executes — clicking, typing, navigating menus — without you touching the keyboard." },
    { type: "callout", variant: "info", content: "Claude Code is available via the Anthropic API and as a CLI tool. It requires explicit permission grants before taking any system action, keeping you in control." },
    { type: "h2", content: "Setting Up Claude for Power Platform" },
    { type: "ul", items: ["Install Claude Code CLI: npm install -g @anthropic-ai/claude-code", "Set ANTHROPIC_API_KEY in your environment", "Launch Power Apps Studio in your browser", "Start a Claude Code session with: claude"] },
    { type: "h2", content: "Demo: Building a Canvas App Autonomously" },
    { type: "p", content: "In our test, we asked Claude to 'create a leave request form connected to a SharePoint list'. Within minutes it had navigated Power Apps Studio, created the data source connection, laid out the form controls, written the OnSelect Power Fx formula, and saved the app — without a single manual click." },
    { type: "code", language: "bash", content: `claude "Open Power Apps Studio, create a new canvas app called LeaveRequest,
connect it to the SharePoint list 'Leave Requests',
add a form with fields: EmployeeName, StartDate, EndDate, Reason,
and add a Submit button that patches the record and shows a success notification"` },
    { type: "h2", content: "Building Flows Autonomously" },
    { type: "p", content: "Claude can navigate Power Automate just as effectively. Point it at a flow and describe what you want changed — it reads the existing actions, identifies the correct insertion point, adds the new step, and configures it." },
    { type: "callout", variant: "tip", content: "Keep your prompts goal-oriented, not step-by-step. Tell Claude what you want the flow to achieve, not which buttons to click — it figures out the navigation itself." },
    { type: "h2", content: "Limitations to Know" },
    { type: "ul", items: ["Complex multi-environment deployments still need your oversight", "Claude cannot authenticate on your behalf — you must be signed in", "Some Power Apps Studio actions trigger dialogs that need confirmation", "Always review generated Power Fx before publishing to production"] },
    { type: "divider" },
    { type: "p", content: "The combination of Claude's reasoning and Power Platform's low-code surface is genuinely powerful. The mundane scaffolding work disappears; you focus on the business logic and outcomes." },
  ],

  "openai-gpt4o-azure-integration": [
    { type: "p", content: "Azure API Management (APIM) is the ideal gateway for exposing OpenAI GPT-4o to your enterprise apps. It gives you rate limiting, authentication, monitoring, and a stable internal endpoint your Power Platform connectors can rely on." },
    { type: "h2", content: "Architecture Overview" },
    { type: "p", content: "The pattern is straightforward: your apps call your APIM endpoint, APIM forwards to the Azure OpenAI resource, and responses flow back through the gateway. Your OpenAI API key never leaves Azure." },
    { type: "callout", variant: "info", content: "Use Azure Managed Identity to authenticate APIM to Azure OpenAI — no key rotation, no secrets in config." },
    { type: "h2", content: "Step 1 — Deploy Azure OpenAI" },
    { type: "ul", items: ["Create an Azure OpenAI resource in East US 2 or Sweden Central (GPT-4o availability)", "Deploy the gpt-4o model under Model Deployments", "Note the endpoint URL and API key (or use Managed Identity)"] },
    { type: "h2", content: "Step 2 — Create the APIM API" },
    { type: "code", language: "bash", content: `az apim api import \
  --resource-group myRG \
  --service-name myAPIM \
  --api-id openai-gpt4o \
  --specification-format OpenApi \
  --specification-url https://raw.githubusercontent.com/Azure/azure-rest-api-specs/main/specification/cognitiveservices/data-plane/AzureOpenAI/inference/stable/2024-02-01/inference.json \
  --path openai` },
    { type: "h2", content: "Step 3 — Add Rate Limiting Policy" },
    { type: "code", language: "xml", content: `<policies>
  <inbound>
    <rate-limit calls="60" renewal-period="60" />
    <quota calls="1000" renewal-period="604800" />
    <set-header name="api-key" exists-action="override">
      <value>{{openai-api-key}}</value>
    </set-header>
    <base />
  </inbound>
</policies>` },
    { type: "h2", content: "Connecting to Power Platform" },
    { type: "p", content: "With APIM in place, create a Power Platform Custom Connector pointing to your APIM gateway URL. Add your APIM subscription key as an API key header. Now Power Apps and Power Automate can call GPT-4o through a proper, governed channel." },
    { type: "callout", variant: "tip", content: "Enable APIM's built-in Application Insights integration to get token usage, latency, and error rate dashboards out of the box." },
    { type: "divider" },
    { type: "p", content: "Azure APIM transforms a raw OpenAI endpoint into a governed enterprise service. The upfront setup pays dividends every time you need to change models, rotate keys, or add a new consumer app." },
  ],

  "sharepoint-json-column-formatting": [
    { type: "p", content: "SharePoint column formatting lets you transform plain list columns into rich visual experiences — colour-coded status badges, progress bars, clickable buttons, and conditional icons — all without writing a single SPFx web part." },
    { type: "h2", content: "How Column Formatting Works" },
    { type: "p", content: "Column formatting is a JSON schema that defines an HTML-like element tree. SharePoint renders it inside each cell. The schema supports a small expression language for conditionals, string operations, and property access." },
    { type: "h2", content: "Basic Status Badge" },
    { type: "code", language: "json", content: `{
  "$schema": "https://developer.microsoft.com/json-schemas/sp/v2/column-formatting.schema.json",
  "elmType": "div",
  "style": {
    "display": "inline-block",
    "padding": "4px 12px",
    "border-radius": "999px",
    "font-weight": "600",
    "background-color": {
      "operator": "?",
      "operands": [
        { "operator": "==", "operands": ["[$Status]", "Approved"] },
        "#d4edda",
        { "operator": "?",
          "operands": [
            { "operator": "==", "operands": ["[$Status]", "Rejected"] },
            "#f8d7da", "#fff3cd"
          ]
        }
      ]
    }
  },
  "txtContent": "[$Status]"
}` },
    { type: "h2", content: "Progress Bar" },
    { type: "p", content: "A progress bar uses two nested divs — the outer sets the track width, the inner sets the fill percentage using the column value." },
    { type: "code", language: "json", content: `{
  "elmType": "div",
  "style": { "width": "100%", "background": "#e9ecef", "border-radius": "4px", "height": "8px" },
  "children": [{
    "elmType": "div",
    "style": {
      "width": { "operator": "+", "operands": ["[$Progress]", "%"] },
      "background": "#0d6efd",
      "height": "8px",
      "border-radius": "4px"
    }
  }]
}` },
    { type: "h2", content: "Clickable Action Button" },
    { type: "p", content: "Use elmType: 'button' with customRowAction to trigger Power Automate flows directly from a list cell." },
    { type: "ul", items: ["Set customRowAction.action to 'executeFlow'", "Provide the flow's GUID in customRowAction.actionParams", "Style the button to match your SharePoint theme"] },
    { type: "callout", variant: "tip", content: "Use the SharePoint Format Columns panel (column settings > Format this column) to paste and preview your JSON in real-time without saving." },
    { type: "divider" },
    { type: "p", content: "Column formatting is one of SharePoint's most underused superpowers. With a few dozen lines of JSON you can turn a dull list into a dashboard-quality experience." },
  ],

  "google-gemini-api-nodejs": [
    { type: "p", content: "Google's Gemini 1.5 Pro is one of the most capable multimodal models available — and with the Google AI SDK for Node.js, you can integrate it into any backend in minutes." },
    { type: "h2", content: "Setup" },
    { type: "code", language: "bash", content: `npm install @google/generative-ai` },
    { type: "p", content: "Get your API key from Google AI Studio (aistudio.google.com). Set it as an environment variable — never hardcode it." },
    { type: "h2", content: "Your First Completion" },
    { type: "code", language: "typescript", content: `import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const result = await model.generateContent("Explain Azure Logic Apps in one paragraph.");
console.log(result.response.text());` },
    { type: "h2", content: "Streaming Responses" },
    { type: "p", content: "For long outputs, streaming delivers tokens as they arrive rather than waiting for the full completion — essential for chat UIs and document summarisation." },
    { type: "code", language: "typescript", content: `const stream = await model.generateContentStream(prompt);
for await (const chunk of stream.stream) {
  process.stdout.write(chunk.text());
}` },
    { type: "h2", content: "Building a Document Summariser" },
    { type: "p", content: "Gemini 1.5 Pro has a 1M token context window — large enough to process entire codebases or lengthy PDFs. Here's a pattern for summarising uploaded documents." },
    { type: "code", language: "typescript", content: `import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import fs from "fs";

const fileData = fs.readFileSync("report.pdf");
const base64 = fileData.toString("base64");

const parts: Part[] = [
  { inlineData: { mimeType: "application/pdf", data: base64 } },
  { text: "Summarise this document in 5 bullet points." }
];

const result = await model.generateContent({ contents: [{ role: "user", parts }] });
console.log(result.response.text());` },
    { type: "callout", variant: "tip", content: "Use Gemini Flash (gemini-1.5-flash) for high-throughput, lower-cost tasks like classification or short answers. Reserve Pro for complex reasoning." },
    { type: "divider" },
    { type: "p", content: "Gemini's generous context window and multimodal capabilities make it a strong fit for document-heavy enterprise workloads. The Node.js SDK keeps the integration friction minimal." },
  ],

  "power-automate-approval-workflow": [
    { type: "p", content: "Multi-stage approval workflows are one of Power Automate's sweet spots — but the built-in approval templates only scratch the surface. This guide walks through parallel branching, escalation, and timeout handling for production-grade flows." },
    { type: "h2", content: "The Approval Architecture" },
    { type: "p", content: "A robust approval flow has three tiers: first-line manager, department head (triggered only on rejection or amounts above threshold), and finance (for high-value requests). Parallel approval collapses wait time when multiple approvers must sign off simultaneously." },
    { type: "h2", content: "Setting Up Parallel Branches" },
    { type: "ul", items: ["Add a 'Parallel Branch' control after your trigger", "Place one 'Start and wait for an approval' action per branch", "Use 'Approve/Reject — First to respond' if any approver can unblock the request", "Use 'Approve/Reject — Everyone must approve' for compliance scenarios"] },
    { type: "h2", content: "Adding Reminder Emails" },
    { type: "p", content: "Use the 'Send an email reminder' action on the approval or implement a 'Do Until' loop that checks approval status every 24 hours and sends a custom nudge." },
    { type: "code", language: "json", content: `{
  "type": "Do Until",
  "expression": "@equals(variables('ApprovalStatus'), 'Approved')",
  "limit": { "count": 5, "timeout": "PT120H" },
  "actions": {
    "Wait_24h": { "type": "Wait", "inputs": { "interval": { "count": 24, "unit": "Hour" } } },
    "Send_Reminder": { "type": "ApiConnection", "inputs": { "host": { "connectionName": "outlook" }, "method": "post", "path": "/Mail" } }
  }
}` },
    { type: "callout", variant: "warning", content: "Set the Do Until loop limit to prevent infinite loops. A timeout of 5 days (PT120H) with 5 iterations covers most business SLAs." },
    { type: "h2", content: "Escalation Logic" },
    { type: "p", content: "If no response arrives within your SLA window, route automatically to the approver's manager using the Office 365 Users connector's Get manager action. Log the escalation to SharePoint for audit purposes." },
    { type: "divider" },
    { type: "p", content: "Multi-stage approval flows seem complex but Power Automate's visual designer makes the logic auditable and maintainable. The key is planning your branching logic before you start building." },
  ],

  "azure-functions-power-automate": [
    { type: "p", content: "Power Automate's built-in connectors cover most scenarios, but when you need custom business logic, real-time data transformation, or access to internal APIs, Azure Functions bridges the gap elegantly." },
    { type: "h2", content: "Why Custom Connectors?" },
    { type: "p", content: "A Power Platform Custom Connector wraps any REST API in a wizard-driven UI, turning it into a first-class action that appears alongside built-in connectors in the flow designer. Your Azure Function becomes a reusable building block across all Power Platform products." },
    { type: "h2", content: "Step 1 — Build the Azure Function" },
    { type: "code", language: "typescript", content: `import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

app.http("processLeaveRequest", {
  methods: ["POST"],
  authLevel: "function",
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    const body = await request.json() as { employeeId: string; days: number };
    const balance = await getLeaveBalance(body.employeeId);
    return {
      jsonBody: { approved: balance >= body.days, remainingDays: balance - body.days }
    };
  }
});` },
    { type: "h2", content: "Step 2 — Secure with AAD" },
    { type: "ul", items: ["Register an App Registration in Azure AD", "Enable 'Microsoft identity platform' authentication on your Function App", "Set the allowed audiences to your App Registration's client ID", "In the Custom Connector, configure OAuth 2.0 with your tenant's authority URL"] },
    { type: "h2", content: "Step 3 — Create the Custom Connector" },
    { type: "p", content: "In Power Platform admin centre, create a new Custom Connector, paste your Function's OpenAPI definition (downloadable from the Azure portal), set the security scheme to OAuth 2.0, and test the connection." },
    { type: "callout", variant: "tip", content: "Export your Function's OpenAPI spec from the Azure portal under API > API Definition. This saves you writing the spec by hand." },
    { type: "divider" },
    { type: "p", content: "Custom connectors turn Azure Functions into governed, reusable enterprise components. Once published to your environment, every maker can use your function without knowing it exists — they just see a connector action." },
  ],

  "copilot-studio-custom-agent": [
    { type: "p", content: "Microsoft Copilot Studio (formerly Power Virtual Agents) has evolved into a full agent platform. You can build agents with custom knowledge, system prompts, plugin actions, and multi-channel deployment — all from a low-code interface." },
    { type: "h2", content: "What Makes an Agent Different from a Chatbot" },
    { type: "p", content: "Traditional chatbots follow rigid decision trees. Copilot Studio agents use GPT-4 under the hood — they reason over your knowledge sources, handle ambiguous queries, and chain actions together autonomously." },
    { type: "h2", content: "Step 1 — Create the Agent" },
    { type: "ul", items: ["Navigate to copilotstudio.microsoft.com", "Click Create > New agent", "Give it a name, description, and instructions (this is your system prompt)", "Add knowledge sources: SharePoint sites, uploaded files, public URLs, or Dataverse tables"] },
    { type: "h2", content: "Step 2 — Configure Topics" },
    { type: "p", content: "Topics are intent handlers. When the agent's built-in AI can't fully handle a query from knowledge alone, it falls back to topic matching. Use topics for structured data collection (booking a meeting, submitting a form)." },
    { type: "callout", variant: "info", content: "Enable 'Generative answers' in your agent settings to let it answer freely from knowledge sources without requiring explicit topic matches." },
    { type: "h2", content: "Step 3 — Add Plugin Actions" },
    { type: "p", content: "Plugin actions connect your agent to live data. Add a Power Automate flow as a plugin action to let your agent query Dataverse, send emails, or create records — all triggered from natural language." },
    { type: "h2", content: "Step 4 — Deploy to Teams and SharePoint" },
    { type: "ul", items: ["Publish the agent from Copilot Studio", "In Channels, enable Microsoft Teams", "Add the agent as a Teams app via the Teams Admin Centre", "Embed on SharePoint pages using the Copilot Studio web chat component"] },
    { type: "divider" },
    { type: "p", content: "Copilot Studio agents are the fastest path from idea to deployed AI for Microsoft 365 organisations. The low-code surface means business stakeholders can participate in the build, not just developers." },
  ],

  "spfx-webpart-react-hooks": [
    { type: "p", content: "SPFx web parts built with class components are increasingly maintenance-heavy. React hooks offer simpler state management, easier testing, and access to the latest React patterns. This guide modernises a typical SharePoint web part from class to hooks." },
    { type: "h2", content: "Project Setup" },
    { type: "code", language: "bash", content: `yo @microsoft/sharepoint
# Choose: Web Part > React framework
npm install @pnp/sp @pnp/logging @pnp/queryable
npm install @pnpjs/pnpjs` },
    { type: "h2", content: "Replacing componentDidMount with useEffect" },
    { type: "code", language: "typescript", content: `import { useState, useEffect } from "react";
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export function useListItems(context: WebPartContext, listName: string) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sp = spfi().using(SPFx(context));
    sp.web.lists.getByTitle(listName).items()
      .then(setItems)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [listName]);

  return { items, loading, error };
}` },
    { type: "h2", content: "Using PnP Reusable Controls" },
    { type: "p", content: "PnP Reusable Controls provides ready-made SPFx components — people pickers, date pickers, file pickers — that are already wired to SharePoint context." },
    { type: "code", language: "bash", content: `npm install @pnp/spfx-controls-react` },
    { type: "code", language: "typescript", content: `import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";

<PeoplePicker
  context={this.props.context as any}
  titleText="Assign To"
  principalTypes={[PrincipalType.User]}
  onChange={(items) => setAssignedTo(items)}
/>` },
    { type: "callout", variant: "tip", content: "Use the usePnPLogger hook from @pnp/logging to add structured logging to your web part without littering console.log calls everywhere." },
    { type: "divider" },
    { type: "p", content: "Migrating SPFx web parts to React hooks reduces boilerplate significantly and makes your components easier to test in isolation. The PnP ecosystem accelerates the common SharePoint patterns so you can focus on business value." },
  ],

  "power-apps-delegation-guide": [
    { type: "p", content: "Delegation is the single most misunderstood concept in Power Apps. The 2000-record warning appears, developers increase the limit to 2000, and move on — without realising their Filter() is silently returning wrong results on datasets above that threshold." },
    { type: "h2", content: "What Delegation Actually Is" },
    { type: "p", content: "Delegation means Power Apps asks the data source to filter, sort, or aggregate server-side, and returns only the matching records. Without delegation, Power Apps fetches up to your row limit client-side, then applies the formula locally — missing any records above the limit." },
    { type: "callout", variant: "warning", content: "The default row limit is 500. Even after raising it to 2000, any dataset with more records will silently return incomplete results for non-delegable formulas." },
    { type: "h2", content: "What Is and Isn't Delegable" },
    { type: "ul", items: ["✅ Filter() with =, <, >, <=, >= on Dataverse columns", "✅ StartsWith() on text columns in Dataverse", "✅ In operator for Choice columns in Dataverse", "❌ Search() against most connectors", "❌ IsBlank() in Filter expressions", "❌ Len(), Left(), Right() inside Filter()", "❌ Filter with lookup column comparisons in SharePoint"] },
    { type: "h2", content: "Pattern 1: Server-Side Search with a Dataverse View" },
    { type: "p", content: "Create a Dataverse saved query (view) with your filter logic. Expose it via a custom API if needed, or access it through the table's filtered view. This pushes all filtering to the server." },
    { type: "h2", content: "Pattern 2: Workaround with Explicit Column Indexing" },
    { type: "code", language: "powerfx", content: `// Instead of: Filter(Contacts, SearchField = txtSearch.Text)
// Use a delegable column:
Filter(
  Contacts,
  'Last Name' = txtSearch.Text  // 'Last Name' is indexed in Dataverse
)` },
    { type: "h2", content: "Pattern 3: Paginated Loading" },
    { type: "p", content: "For large datasets, implement manual pagination using a LastItem variable and the Last() + FirstN() pattern to page through records without hitting delegation limits." },
    { type: "callout", variant: "tip", content: "Turn on the delegation warning in File > Settings > Upcoming features. Every yellow warning is a potential data accuracy bug in production." },
    { type: "divider" },
    { type: "p", content: "Delegation isn't a limitation to work around — it's a design constraint that forces correct architecture. Embrace it early, and your app will scale to millions of records without a code rewrite." },
  ],
};

export function getPostContent(slug: string): ArticleContent {
  return content[slug] ?? [
    { type: "p", content: "Full article content coming soon. Check back for the complete guide." },
  ];
}
