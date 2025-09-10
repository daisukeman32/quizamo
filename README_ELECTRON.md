# QUIZAMO Electron版セットアップガイド

## インストール方法

### 1. 依存関係のインストール
```bash
npm install
```

### 2. アプリケーションの起動
```bash
npm start
```

### 3. ビルド（配布用）

#### Windows版
```bash
npm run build-win
```

#### Mac版
```bash
npm run build-mac
```

#### Linux版
```bash
npm run build-linux
```

## Electron版の特徴

### ローカルファイルシステムへの直接アクセス
- **画像フォルダ選択**: フォルダを選択するだけで、その中の全画像を自動読み込み
- **完成フォルダ指定**: 保存先フォルダを事前に指定可能
- **直接保存**: ブラウザのダウンロードを経由せず、指定フォルダに直接保存

### 使用方法
1. 「SELECT IMAGE FOLDER」をクリックして画像フォルダを選択
2. 「SELECT OUTPUT FOLDER」をクリックして保存先フォルダを選択
3. 画像をモザイク処理
4. 「SAVE IMAGE」で指定フォルダに自動保存

### セキュリティ
- Context Isolation有効
- Node Integration無効
- Preloadスクリプトによる安全なIPC通信

## システム要件
- Node.js 14以上
- npm 6以上
- Windows 10/11, macOS 10.14+, Ubuntu 18.04+

## トラブルシューティング

### npmインストールでエラーが出る場合
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Electronが起動しない場合
```bash
npx electron-rebuild
```