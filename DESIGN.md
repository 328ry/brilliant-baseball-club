# Design System — BRILLIANT Baseball Club

> 草野球チーム「BRILLIANT」公式サイトのデザインルール。
> 参考: アトレチコ鈴鹿クラブ公式サイト（https://atletico-suzuka.com/）の構造哲学を、白×ネイビー×赤の野球配色に翻訳。
> コーディング中は常にこのファイルを参照する。

---

## 1. Visual Theme & Atmosphere

「ロッカールームの空気を持ち帰った草野球サイト」。
草野球＝アマチュアの楽しさを残しつつ、Jクラブ並みのレイアウト密度と所作で見せる。賑やかなフラッシュメッセージや過剰なアニメーションは入れず、紙のような落ち着いた白地に、ネイビーの重みと赤の差し色で背筋を伸ばす。

### Key Characteristics
- **白地優先**：背景は基本ホワイト or 暖グレー。色を盛らず、写真と数字で印象を作る
- **ネイビー＝芯**：ヘッダー・フッター・ボタン・見出し線。チームの背骨を表す
- **赤＝瞬間**：CTA・スコア・ハイライト1点投入。多用しない（紙の上にバットで打った点を置く感覚）
- **数字とロゴが主役**：写真がなくても背番号・スコア・「#7 中野」だけで成立する設計
- **フラットだが軽くない**：影は極薄、罫線とコントラストで構造を立てる

### CSS変数 命名テーマ
野球場とユニフォームの語彙で揃える。`--primary` / `--accent` のような汎用名は禁止。

| 変数 | HEX | 役割 |
|---|---|---|
| `--chalk` | `#FFFFFF` | 白線・ベース背景（チーム色のベース） |
| `--field-navy` | `#15264C` | チームメイン色（ユニフォームの紺。大学野球的な伝統紺） |
| `--field-navy-deep` | `#0A1730` | ヘッダー・フッターの暗紺 |
| `--hit-red` | `#9D2235` | アクセント（エンジ＝深い臙脂色。CTA・スコア・見出し下線） |
| `--leather` | `#5A3A22` | サブアクセント（グローブの革色、使用控えめ） |
| `--turf-shadow` | `#F2EFE9` | 区画背景（紙のような暖グレー） |
| `--strikeline` | `#E6E4DF` | 区切り線（薄いベージュグレー） |
| `--night` | `#1A1A1A` | 本文テキスト（純黒より少し暖かい黒） |
| `--dugout` | `#5A5A55` | サブテキスト・キャプション |

---

## 2. Color Palette & Roles

### Primary
- `--field-navy #15264C` — メイン色（紺）。ロゴ・h1〜h3・主要ボタン背景・ナビ文字
- `--field-navy-deep #0A1730` — ヘッダー/フッター背景・モーダル背景

### Accent
- `--hit-red #9D2235` — エンジ（深い臙脂色）。CTA・スコアの強調・見出し直下の短い下線
  - 「白×紺×エンジ」の大学野球的な伝統配色を採用。鮮やかな朱赤ではなく、紺と並べて落ち着く深いワインレッド寄り
  - **使用ルール**：1スクリーンに大きい赤は1〜2か所まで。ボタン以外で赤面積を出さない

### Interactive
- ボタンhover: `--hit-red` 背景 → `--chalk` 文字（参考サイトの「白⇄テキスト色」反転の翻訳）
- リンクhover: `opacity 0.6` （参考サイトのMinimal hoverを踏襲）
- 入力フォーカス: `--field-navy` の2pxアウトライン

### Neutral Scale
- `--night #1A1A1A` — 本文
- `--dugout #5A5A55` — キャプション・サブテキスト
- `--strikeline #E6E4DF` — 区切り線

### Surface & Borders
- 通常背景: `--chalk #FFFFFF`
- セクション切替背景: `--turf-shadow #F2EFE9`
- カードボーダー: `1px solid --strikeline`
- カード背景: `--chalk` （影は使わずボーダーで区切る）

### Shadow Colors
- 参考サイトの影は極薄（rgba(0,0,0,.15) / .05）→ 同じ温度感で。色付きでない控えめなニュートラル

---

## 3. Typography Rules

### Font Family
- **Primary (Japanese)**: `"Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif`
- **Display (English/Number)**: `"Roboto Condensed", "Oswald", sans-serif` ← 数字・背番号・"BRILLIANT" の表示に。コンデンスド体でスポーツ感
- **Mono (Score表示)**: `"JetBrains Mono", monospace` ← スコアボード・成績表

### Hierarchy

| Role | Font | Size | Weight | Line-Height | Letter-Spacing |
|---|---|---|---|---|---|
| Display Hero (BRILLIANT) | Roboto Condensed | clamp(48px, 8vw, 96px) | 700 | 1.0 | 0.04em |
| Section Heading (h2) | Noto Sans JP | clamp(28px, 4vw, 40px) | 700 | 1.3 | 0.04em |
| Sub-heading (h3) | Noto Sans JP | 20px | 700 | 1.4 | 0.04em |
| Body | Noto Sans JP | 16px | 400 | 1.7 | 0.04em |
| Button | Roboto Condensed | 14px | 700 | 1.0 | 0.08em (uppercase) |
| Caption | Noto Sans JP | 13px | 400 | 1.5 | 0.04em |
| Micro (Date等) | Roboto Condensed | 12px | 500 | 1.0 | 0.06em |
| 背番号 (大) | Roboto Condensed | 64-96px | 900 | 1.0 | -0.02em |
| スコア | JetBrains Mono | 32-48px | 700 | 1.0 | 0 |

### Principles
1. **見出しはNoto Sans JP、英数字・装飾はRoboto Condensed** — 日本語の力強さと英数字のスポーツ感を両立
2. **背番号は大きく** — ヒーローやプレイヤーカードで64px以上、ロゴ的に扱う
3. **段落の左に4pxの赤バー**（h2の左側）で見出しを補強。Jクラブ風

---

## 4. Component Stylings

### Buttons

**Primary（CTA・募集ボタン）**
```css
background: var(--field-navy);
color: var(--chalk);
padding: 14px 32px;
border: none;
border-radius: 3px;
font-family: "Roboto Condensed", sans-serif;
font-weight: 700;
letter-spacing: 0.08em;
text-transform: uppercase;
transition: all 0.3s cubic-bezier(0.22, 1, 0.14, 1);
/* hover: */ background: var(--hit-red);
```

**Ghost（サブアクション）**
```css
background: transparent;
color: var(--field-navy);
border: 1.5px solid var(--field-navy);
/* hover: */ background: var(--field-navy); color: var(--chalk);
```

**Accent（注目させたい1点）**
```css
background: var(--hit-red);
color: var(--chalk);
/* hover: */ background: var(--field-navy-deep);
```

### Cards & Containers
- 背景: `--chalk`
- ボーダー: `1px solid --strikeline`
- radius: `8px`（参考サイトの`--border-radius01`継承）
- 内側パディング: `24px`（モバイル）/ `32px`（デスクトップ）
- 影: 原則なし。hover時のみ `box-shadow: 0 8px 24px rgba(14, 33, 72, 0.08)` で軽く浮かす
- 角丸ルール: inner-radius = max(outer-radius - padding - border-width, 0)

### Badges / Tags
- 背景: `--field-navy` / 文字: `--chalk`
- padding: `4px 10px`
- radius: `3px`
- font-size: 12px Roboto Condensed uppercase
- バリアント: 勝=`--hit-red`bg / 負=`--dugout`bg / 引分=`--strikeline`bg + `--night`text

### スコア表示（独自コンポーネント）
- フォント: JetBrains Mono 32-48px
- 背景: `--field-navy-deep`
- 文字: `--chalk`
- 区切り: `vs` を `--hit-red` で
- 例: `BRILLIANT 5 - 2 OPPONENT`

### Inputs & Forms
- ボーダー: `1px solid --strikeline`
- radius: `3px`
- focus: `outline: 2px solid --field-navy; outline-offset: 0`
- ラベルは入力欄の上、Noto Sans JP 14px、`--dugout`

### Navigation (N1 sticky + 階層メガメニュー)
- 構造: `position: sticky; top: 0; z-index: 998`
- 背景: `--chalk` （スクロール時も白を維持）
- 高さ: 80px（desktop）/ 64px（mobile）
- ロゴ: 左、Roboto Condensed 「BRILLIANT」
- メニュー: 右、Noto Sans JP 15px 700
- hover: 下線アニメ（`--hit-red` 2px の左→右展開）
- モバイル: ハンバーガー → フルスクリーンドロワー（`--field-navy-deep` bg）

---

## 5. Layout Principles

### Spacing System
基本単位: 8px

| トークン | 値 |
|---|---|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 40px |
| 2xl | 64px |
| 3xl | 96px |
| 4xl | 128px |

### Grid & Container
- max-width: **1280px** （参考サイトの1296pxを少し丸めた値）
- inner-padding: **32px** desktop / **20px** mobile
- グリッド: CSS Grid + Flexbox 併用

### Section Padding
- desktop: `padding-block: 96px` （3xl）
- mobile: `padding-block: 56px`
- → 参考サイトの「ゆとり」と「下スクロールしたくなるリズム」のバランス

### Border Radius Scale
- micro: 3px（ボタン・タグ・スコアセル）
- standard: 8px（カード・モーダル）※ 12px以上は使わない（Jクラブの「硬質さ」維持）

### セクション構成（参考サイトの順序を野球チーム向けに翻訳）

**HOME (index.html)**
1. **Topics帯** — 横スライダーティッカー — `--chalk` bg, splide.js風 — 参考サイトのTOPICSをそのまま踏襲
2. **Hero ビジュアル + キャッチコピー** — フルブリード画像 + 左下キャッチ — `brightness(0.7)` overlay — H1
3. **Next Match（次戦案内）** — 大きな日付＋対戦相手＋スコアボード風 — `--field-navy-deep` bg, `--chalk` text — H2見出し左4px赤線
4. **Latest Result（直近結果）** — 試合結果3件カード横並び — `--chalk` bg
5. **Pickup Player（注目選手）** — 背番号大写し+短文 1〜3件 — `--turf-shadow` bg
6. **Club Culture（チームの雰囲気）** — 画像+テキスト 左右交互配置 (split-content) 2〜3ブロック — `--chalk` bg
7. **Schedule（今月の予定）** — シンプルテーブル — `--chalk` bg
8. **News（お知らせ）** — リスト3件 + もっと見る — `--turf-shadow` bg
9. **SNS / Channels** — ロゴ並び — `--field-navy-deep` bg, `--chalk` text
10. **募集CTA帯** — 大きな赤ボタン1点 — `--field-navy` bg
11. **Footer**

**Games (games.html)**
1. Hero band（ページタイトル + 背景画像 brightness 0.7）
2. Next Match（同上の詳細版）
3. Season Schedule（今シーズン全試合表 + 勝敗バッジ）
4. Past Results（過去戦績アーカイブ）
5. Season Stats（チーム成績・打率・防御率）
6. 対戦相手募集 CTA

**Team (team.html)**
1. Hero band
2. Team Story（チーム紹介・結成経緯）
3. Captain / Manager Message（監督・キャプテンの一言）
4. Members Grid（背番号大・ポジション・名前 12〜18名）
5. Staff（コーチ・マネージャー）
6. Team History（年表）

**Gallery (gallery.html)**
1. Hero band
2. Match Photos（試合写真 グリッド）
3. Practice Photos（練習風景）
4. Off-shot（オフショット・打ち上げ等）
5. Tournament Highlights（大会写真）

**Join (join.html)**
1. Hero band
2. Recruitment Overview（募集要項）
3. Practice試合相手募集
4. 応援団・スタッフ募集
5. FAQ Accordion
6. Contact Form

### レイアウトパターン
- `layout_patterns.md` の **A. スタンダード型** をベースに、TOPICSスライダーを冒頭追加して参考サイトの構造を踏襲
- ヒーロー: **H1（フルブリード）** + 上部にTOPICS帯 ※参考サイトのH5（スライダー）を分割して翻訳
- ナビ: **N1（sticky固定ヘッダー）**

---

## 6. Depth & Elevation

| Level | 用途 | box-shadow |
|---|---|---|
| Flat (default) | カード通常時、セクション背景 | なし |
| Ambient | カードhover時 | `0 8px 24px rgba(14, 33, 72, 0.08)` |
| Standard | 浮きナビ・ドロップダウン | `0 4px 16px rgba(0, 0, 0, 0.12)` |
| Modal | モーダル・トースト | `0 16px 48px rgba(5, 14, 38, 0.24)` |

### Shadow Philosophy
- 参考サイトと同じく、影で立体感を作らずborderと色面で構造を立てる
- shadowは「触れる前後」の状態変化を示すだけに使う

### Decorative Depth
- セクション間: `--turf-shadow` と `--chalk` の交互で奥行きを作る
- ヒーロー画像: `filter: brightness(0.7)` でテキストの読みやすさ確保（参考サイトの0.8を野球フィールド画像が明るめなので少し強める）

---

## 7. Do's and Don'ts

### Do
- ✅ 背景は `--chalk` か `--turf-shadow` の2択でリズムを作る
- ✅ 見出しh2の左に `4px × 24px` の `--hit-red` 縦バーを必ず置く（チーム識別子）
- ✅ 背番号は Roboto Condensed 64px以上で「ロゴ」のように扱う
- ✅ ボタンhover時は背景色を `--field-navy → --hit-red` に切り替え（参考サイトの色反転を翻訳）
- ✅ スクロール時の出現は `js-fadeup` パターンを踏襲：`opacity: 0 + translateY(50px)` から戻す
- ✅ イージングは `cubic-bezier(0.22, 1, 0.14, 1)` 一本で統一（参考サイト準拠）
- ✅ Topics帯は本物のニュースサイトのティッカー風（横スクロール、自動再生 or 手動）

### Don't
- ❌ 角丸12px以上を使わない（Jクラブのカッチリ感を維持）
- ❌ 1スクリーンに「赤」を3面以上出さない（赤は瞬間のための色）
- ❌ box-shadowで奥行きを盛らない（影はhover時のみ）
- ❌ 絵文字・1辺だけ色付きボーダー・「ヒーロー直下に数字3つ並べる」テンプレ構成 NG（CLAUDE.md準拠）
- ❌ 角丸の上下左右を変えた装飾（非対称radius）はしない — 草野球の硬質感を守る
- ❌ Lorem ipsum・ダミーカウンター・抽象的すぎる「私たちのミッション」文 NG
- ❌ サイドフェード（左右からのslide-in）はしない — 動きは下→上(fadeup)のみ
- ❌ 「整いすぎ」を避けるため、カードグリッドを全部3列にしない（場面によって2列/3列/4列を使い分ける）

---

## 8. Responsive Behavior

### Breakpoints

| 名称 | 範囲 | 主用途 |
|---|---|---|
| Mobile | ~ 767px | スマホ |
| Tablet | 768px ~ 1023px | iPad縦 |
| Desktop | 1024px ~ 1279px | ノートPC |
| Large Desktop | 1280px ~ | 大型モニタ |

### Touch Targets
- 最小44×44px（iOS HIG準拠）
- ボタン: padding 14px 24px 以上

### Collapsing Strategy
- ナビ: 1024px以下でハンバーガー化（フルスクリーンドロワー、`--field-navy-deep` bg）
- 3カラムグリッド: 1024px以下で2カラム → 767px以下で1カラム
- ヒーロー文字: `clamp()` で自然縮小
- スコアボード: モバイルでは縦並びに切り替え
- Topics帯: モバイルでも横スクロール維持（縦に積まない）

### Image Behavior
- ヒーロー画像: `object-fit: cover`、最小高さ `min(70vh, 560px)`
- カード画像: `aspect-ratio: 4/3` 固定
- ギャラリー: マソンリーではなく均等グリッド（草野球のシンプルさ）

---

## 9. Agent Prompt Guide

### Quick Color Reference
- ホワイト = `var(--chalk)` = `#FFFFFF`
- 紺 = `var(--field-navy)` = `#15264C`
- 濃紺 = `var(--field-navy-deep)` = `#0A1730`
- エンジ = `var(--hit-red)` = `#9D2235`
- 暖グレー背景 = `var(--turf-shadow)` = `#F2EFE9`
- 罫線 = `var(--strikeline)` = `#E6E4DF`
- 本文黒 = `var(--night)` = `#1A1A1A`
- サブ文字 = `var(--dugout)` = `#5A5A55`

### Example Component Prompts

**1. プレイヤーカード**
```
背景は --chalk、ボーダー 1px solid --strikeline、radius 8px、padding 24px。
左に背番号 Roboto Condensed 800 72px --field-navy で大きく。
右に名前（Noto Sans JP 18px 700）、ポジション（13px --dugout）、
打率・成績（JetBrains Mono 14px）を3行で。
hover時に box-shadow: 0 8px 24px rgba(14,33,72,.08) を付与し、translateY(-2px)。
```

**2. 試合結果カード**
```
背景は --chalk、ボーダー 1px solid --strikeline、radius 8px。
上に日付（Roboto Condensed 12px --dugout）と勝敗バッジ（勝=--hit-red bg / 負=--dugout bg）。
中央に「BRILLIANT 5 - 2 OPPONENT」を JetBrains Mono 24px、
vsの部分だけ --hit-red。
下に会場名（Noto Sans JP 13px --dugout）。
```

**3. 募集CTAボタン**
```
background: --field-navy、color: --chalk、
padding 16px 40px、radius 3px、
font: Roboto Condensed 700 16px uppercase letter-spacing 0.08em、
hover: background --hit-red、transition 0.3s cubic-bezier(0.22,1,0.14,1)。
```

**4. セクション見出しh2**
```
display: flex; align-items: center; gap: 16px;
::before で 4px × 24px の --hit-red 縦バーを表示。
文字は Noto Sans JP 700 clamp(28px, 4vw, 40px) --field-navy。
英語subtitleを上に Roboto Condensed 13px --hit-red uppercase で添える。
```

**5. Topicsティッカー帯**
```
background: --chalk、border-block: 1px solid --strikeline、
height 56px、内部は横スクロールリスト、
各item: 「TOPICS」ラベル（Roboto Condensed 11px --hit-red）+ 日付 + 短文、
gap 48px、5秒ごとに自動スクロール（splide.js風）。
```

### Iteration Guide（守るべきルール）

1. **変数を直接書かない** — 必ず `var(--field-navy)` 形式で参照する
2. **見出しには必ず赤の縦バー** — h2の `::before` を忘れない
3. **数字（背番号・スコア・年・打率）は Roboto Condensed か JetBrains Mono** — Noto Sans JPで書かない
4. **影は hover 時だけ** — 通常状態で box-shadow を書かない
5. **イージングは `cubic-bezier(0.22, 1, 0.14, 1)`** — 他のbezierを混ぜない
6. **fadeupは `translateY(50px) + opacity:0` から戻す** — sideやscaleではない
7. **背景色を選ぶときは `--chalk` か `--turf-shadow` の2択** — 他の色は使わない（`--field-navy-deep` はヘッダー・フッター・SNS帯のみ）
8. **絵文字を入れない。SVGアイコンで代用** — CLAUDE.md準拠

### アニメーション人格
**Minimal + Directional（混合）**
- Minimal: ホバーは opacity 0.6 / 背景色反転のみ
- Directional: スクロール出現は下から `translateY(50px)` でスライドアップ
- パララックスや scroll-driven は使わない（堅実なJクラブ作法）

### インタラクティブ演出
参考サイトには canvas KV があるが、草野球サイトでは過剰なので**採用せず**。代わりに以下を提案：
- **Topicsティッカー（自動横スクロール）** — ニュース性を出す。参考サイト準拠
- **背番号のhover拡大** — プレイヤーカードでさり気なく
- **スコアボード風スコア表示** — 試合結果セクションで世界観強化

派手な演出（マグネティック・glitch・パーティクル）は入れない。
