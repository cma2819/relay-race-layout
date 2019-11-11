# relay-race-layout

NodeCG common bundle for speedrun relay race event

## Requirements

- Node.js 10 and later

## Installation

- Clone

```
$ git clone https://github.com/cma2819/relay-race-layout.git
```

- `relay-race-layout`というフォルダが作成されます. 本 NodeCG レイアウトの本体です.
- `include-nodecg`というライブラリを使っているため, NodeCG を別途インストールして`bundles`に配置等は不要です.

- install

```
# git clone直後の状態から下記コマンドを実行してください.

$ cd relay-race-layout
$ npm install
$ npm run build
```

**Windows の場合, 管理者として実行したコマンドプロンプト上で実行してください.**

- Run NodeCG

```
$ npm start
```

- Open NodeCG dashboard on `localhost:9090`

## Tutorials

1. [設定画面ダッシュボード](doc/tutorial/01_config_dashboard.md)
2. [進捗管理ダッシュボード](doc/tutorial/02_progress_dashboard.md)

## License

MIT License
