# OtamaMIDI

[Web Music ハッカソン #3](http://googledevjp.blogspot.jp/2014/08/web-music-3.html)で作成した、オタマトーンをWeb AudioとWeb MIDIでイケてる楽器にしちゃうアプリケーションです。
3位をいただきました！


## 遊び方

1. ポケットミクを接続します。
2. オーディオインターフェースからオタマトーンの音を入力できるようにします。
3. [ページ](http://kirinsan-org.github.io/OtamaMIDI/)にアクセスします。
4. マイクへのアクセスを許可するか確認する表示が出るので、許可します。
5. オタマトーンを鳴らします。
6. 音階や音色を変えて楽しみましょう。

ポケットミクを接続しなくても他のMIDIデバイスで音を鳴らすことができますが、その場合はミクの音色は使えません。


## 使用しているライブラリ等

* [miku.js](https://github.com/ejeinc/miku.js)を修正して使用しています。
* `midiNoteDetector.js`はWeb Audioのソースから周波数とMIDIノートナンバーを計算するコードです。
* `audioContext.js`はAngularJSのService風にAudioContextを利用するためのラッパーです。
* `otama.js`はこのアプリケーション本体のコードです。


## License

MIT