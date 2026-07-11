# Cloudflare Turnstile 設定說明

網站已內建 Turnstile 驗證端點（`POST /api/turnstile/verify`，位於 `server/worker.ts`）
與前端元件（`client/src/components/TurnstileWidget.tsx`）。
完成以下步驟即可啟用。

## 1. 建立 Turnstile Widget

到 Cloudflare Dashboard → Turnstile → Add site（即你的
`dash.cloudflare.com/.../turnstile/add` 頁面）：

- **Site name**：`my-portfolio`（任意）
- **Hostnames**：加入 `my-portfolio.<你的子網域>.workers.dev`，若有自訂網域也一併加入
- **Widget mode**：Managed（建議）

建立後會得到 **Site Key**（公開）與 **Secret Key**（保密）。

## 2. 設定 Secret Key（Worker 端）

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
# 貼上 Secret Key
```

## 3. 設定 Site Key（前端）

在專案根目錄建立 `.env`（已被 .gitignore 排除）：

```
VITE_TURNSTILE_SITE_KEY=你的SiteKey
```

未設定時前端會使用 Cloudflare 測試金鑰 `1x00000000000000000000AA`（永遠通過，僅供開發）。

## 4. 部署

```bash
pnpm run deploy:cloudflare
```

## 5. 測試端點

```bash
curl -X POST https://my-portfolio.<子網域>.workers.dev/api/turnstile/verify \
  -H "content-type: application/json" \
  -d '{"token":"test"}'
# 未設 secret → {"success":false,"error":"secret_not_configured"}
# 已設 secret、token 無效 → {"success":false,"error":"invalid_token",...}
```

## 6. 在頁面中使用（之後要加表單時）

```tsx
import TurnstileWidget from "@/components/TurnstileWidget";

<TurnstileWidget onVerified={() => setCanSubmit(true)} />
```

驗證流程：widget 取得 token → 前端 POST 到 `/api/turnstile/verify` →
Worker 以 Secret Key 呼叫 Cloudflare siteverify → 回傳 `{ success: true }`。
