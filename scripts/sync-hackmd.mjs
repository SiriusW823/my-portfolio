import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const token = process.env.HACKMD_TOKEN;

if (!token) {
  throw new Error("HACKMD_TOKEN is required to sync articles.");
}

const noteConfig = [
  {
    id: "zT4MQrfITAqyY6K5yq-AFQ",
    slug: "isip-hs-ctf-writeup",
    category: "security",
    summary: "ISIP-HS CTF 解題紀錄，涵蓋 Web、OSINT、雲端服務與基礎逆向題型。",
    featured: true,
  },
  {
    id: "_Ybywtp2Q3yKEgqKjKAb5Q",
    slug: "thjcc-ctf-2026-writeup",
    category: "security",
    summary: "THJCC CTF 2026 學生組第 16 名的賽後整理，記錄 Web 題目的觀察、嘗試與解法。",
    featured: true,
  },
  {
    id: "74os89FeTbyFh-bZsb0x0Q",
    slug: "fhctf-writeup",
    category: "security",
    summary: "FhCTF 的 Misc 與 Web 解題筆記，包含編碼、檔案上傳與 Python 題型。",
    featured: false,
  },
  {
    id: "t14bIzXAQZ-Kz5DLGOp3NA",
    slug: "quantum-rl-molecular-generation",
    category: "quantum",
    summary: "從 classical RL 基線到量子引導架構的分子生成研究紀錄，包含負結果與設計修正。",
    featured: true,
  },
  {
    id: "AWZz0HPkQzetj9rFA7Ijhg",
    slug: "eis-formulas",
    category: "engineering",
    summary: "EIS 常用物理量、等效元件與阻抗公式的速查整理。",
    featured: false,
  },
  {
    id: "9qrJtz4AQYCYMGwOX2JIDA",
    slug: "generative-quantum-eigensolver-notes",
    category: "quantum",
    summary: "Generative Quantum Eigensolver 與 GPT-QE 的訓練流程、資料集與結果分析。",
    featured: false,
  },
  {
    id: "VpFsqdcaShCnc43Kuef0ew",
    slug: "qml-adversarial-robustness",
    category: "quantum",
    summary: "量子機器學習模型的對抗性攻擊、PGD 實作與再訓練筆記。",
    featured: false,
  },
  {
    id: "0-xJ1hvtSwaNoPa8o64PqQ",
    slug: "quantum-image-generation",
    category: "quantum",
    summary: "量子 GAN、Quanvolution 與 Born Machine 的原理，以及 PennyLane、NVIDIA 實作脈絡。",
    featured: false,
  },
  {
    id: "69GVRhsMRN-27gVLfpYp3g",
    slug: "quantum-glossary",
    category: "quantum",
    summary: "從 qubit、量子閘到 VQE、QAOA 的量子運算名詞筆記。",
    featured: false,
  },
  {
    id: "VJaQLtnNQU2ucbl6t3Gv0Q",
    slug: "random-forest",
    category: "machine-learning",
    summary: "隨機森林的 Bagging、隨機特徵選取、超參數與實務限制。",
    featured: false,
  },
  {
    id: "OrA7ltP2QoGHLKYKayj1Vg",
    slug: "k-means",
    category: "machine-learning",
    summary: "K-means 的迭代流程、SSE 目標、初始化與分群實務。",
    featured: false,
  },
  {
    id: "RfsDXMTyRSWo-MWFijIPfw",
    slug: "knn",
    category: "machine-learning",
    summary: "KNN 的距離度量、鄰居投票、特徵縮放與使用情境。",
    featured: false,
  },
  {
    id: "WBy5psEvRJiezyA7fj7akg",
    slug: "support-vector-machine",
    category: "machine-learning",
    summary: "SVM 的最大間隔、核函數、超參數與小樣本應用。",
    featured: false,
  },
  {
    id: "30_zMxRZRay9ix_3gNyaKA",
    slug: "multinomial-logistic-regression",
    category: "machine-learning",
    summary: "二元與多類邏輯斯回歸的機率模型、損失函數與可解釋性。",
    featured: false,
  },
  {
    id: "N5b-OFP_R3uUNPOEnxljHg",
    slug: "shors-algorithm",
    category: "quantum",
    summary: "Shor 演算法的週期尋找、數學流程、密碼學影響與實機挑戰。",
    featured: false,
  },
  {
    id: "2UY43xxTTaSo08XG7KqLGA",
    slug: "ais3-junior-team-project",
    category: "security",
    summary: "AIS3 Junior 第 8 組專題紀錄：WordPress 漏洞環境、CVE 重現與分工實作。",
    featured: false,
  },
  {
    id: "XSy1iWlLT5-TD7mfUoZRRw",
    slug: "web-ctf-basic-writeup",
    category: "security",
    summary: "AIS3 Junior Web CTF 基礎作業，從 HTTP 方法、Cookie 到原始碼與注入題型。",
    featured: false,
  },
];

function normalizeMarkdown(content) {
  return content
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "")
    .replace(/^######\s+tags:.*$/gim, "")
    .replace(/^\[(?:toc|TOC)\]\s*$/gm, "")
    .replace(/^\{%hackmd[^%]*%\}\s*$/gm, "")
    .replace(/:::(success|info|warning|danger)\s*\r?\n([\s\S]*?)\r?\n:::/g, (_, kind, body) => {
      const label = kind === "success" ? "結果" : kind === "danger" ? "注意" : "說明";
      return `> **${label}**\n> ${body.trim().replace(/\r?\n/g, "\n> ")}`;
    })
    .trim();
}

function formatDate(timestamp) {
  return new Date(timestamp).toISOString().slice(0, 10);
}

async function fetchNote(config) {
  const response = await fetch(`https://api.hackmd.io/v1/notes/${config.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`HackMD ${config.id} returned ${response.status}`);
  }

  const note = await response.json();
  const content = normalizeMarkdown(note.content ?? "");

  return {
    id: config.id,
    slug: config.slug,
    title: note.title,
    category: config.category,
    summary: config.summary,
    featured: config.featured,
    tags: Array.from(new Set([...(note.tags ?? []), config.category])),
    publishedAt: formatDate(note.createdAt),
    updatedAt: formatDate(note.lastChangedAt),
    readingMinutes: Math.max(1, Math.ceil(content.length / 900)),
    sourceUrl: note.publishLink,
    content,
  };
}

const articles = (await Promise.all(noteConfig.map(fetchNote))).sort(
  (a, b) => b.updatedAt.localeCompare(a.updatedAt),
);

const outputPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../client/src/data/articles.generated.ts",
);
const indexOutputPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../client/src/data/articleIndex.generated.ts",
);

const output = `// Generated by scripts/sync-hackmd.mjs. Do not edit article bodies by hand.\n\nexport type ArticleCategory =\n  | "security"\n  | "quantum"\n  | "machine-learning"\n  | "engineering";\n\nexport interface Article {\n  id: string;\n  slug: string;\n  title: string;\n  category: ArticleCategory;\n  summary: string;\n  featured: boolean;\n  tags: string[];\n  publishedAt: string;\n  updatedAt: string;\n  readingMinutes: number;\n  sourceUrl: string | null;\n  content: string;\n}\n\nexport const articles: Article[] = ${JSON.stringify(articles, null, 2)};\n`;

const articleIndex = articles.map(({ content: _content, ...article }) => article);
const indexOutput = `// Generated by scripts/sync-hackmd.mjs.\n\nexport type ArticleCategory =\n  | "security"\n  | "quantum"\n  | "machine-learning"\n  | "engineering";\n\nexport interface ArticleSummary {\n  id: string;\n  slug: string;\n  title: string;\n  category: ArticleCategory;\n  summary: string;\n  featured: boolean;\n  tags: string[];\n  publishedAt: string;\n  updatedAt: string;\n  readingMinutes: number;\n  sourceUrl: string | null;\n}\n\nexport const articleIndex: ArticleSummary[] = ${JSON.stringify(articleIndex, null, 2)};\n`;

await mkdir(dirname(outputPath), { recursive: true });
await Promise.all([
  writeFile(outputPath, output, "utf8"),
  writeFile(indexOutputPath, indexOutput, "utf8"),
]);

console.log(`Synced ${articles.length} HackMD articles.`);
