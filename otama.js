angular.module('OtamaMIDI', ['ngTouch', 'AudioContext', 'MidiNoteDetector']).factory('getUserMedia', function($window) {
  return function(opts) {
    return new Promise(function(resolve, reject) {
      $window.navigator.webkitGetUserMedia(opts, resolve, reject);
    });
  };
}).factory('boombox', function($window) {
  var boombox = $window.boombox;
  boombox.setup();
  boombox.load('kirinsan', {
    src: [{
      media: 'audio/mp3',
      path: 'kirinsan.mp3'
    }]
  }, function(err, audio) {});
  boombox.load('iiyone', {
    src: [{
      media: 'audio/mp3',
      path: 'iiyone.mp3'
    }]
  }, function(err, audio) {});
  boombox.load('yeah', {
    src: [{
      media: 'audio/mp3',
      path: 'yeah.mp3'
    }]
  }, function(err, audio) {});
  boombox.load('oshimai', {
    src: [{
      media: 'audio/mp3',
      path: 'oshimai.mp3'
    }]
  }, function(err, audio) {});
  return boombox;
}).controller('Main', function($scope, audioContext, MidiNoteDetector, getUserMedia, boombox) {
  $scope.midiNotes = ['C', 'C#1', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#0', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#1', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#2', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#3', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#5', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#6', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#7', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#8', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#9', 'D', 'D#', 'E', 'F', 'F#', 'G'];
  $scope.tones = ['ミク', 'アコースティックピアノ', 'ブライトピアノ', 'エレクトリックグランドピアノ', 'ホンキートンクピアノ', 'エレクトリックピアノ', 'エレクトリックピアノ2', 'ハープシコード', 'クラビネット', 'チェレスタ', 'グロッケンシュピール', 'オルゴール', 'ヴィブラフォン', 'マリンバ', 'シロフォン', 'チューブラーベル', 'ダルシマー', 'ドローバーオルガン', 'パーカッシブオルガン', 'ロックオルガン', 'チャーチオルガン', 'リードオルガン', 'アコーディオン', 'ハーモニカ', 'タンゴアコーディオン', 'アコースティックギター（ナイロン弦）', 'アコースティックギター（スチール弦）', 'ジャズギター', 'クリーンギター', 'ミュートギター', 'オーバードライブギター', 'ディストーションギター', 'ギターハーモニクス', 'アコースティックベース', 'フィンガー・ベース', 'ピック・ベース', 'フレットレスベース', 'スラップベース 1', 'スラップベース 2', 'シンセベース 1', 'シンセベース 2', 'ヴァイオリン', 'ヴィオラ', 'チェロ', 'コントラバス', 'トレモロ', 'ピッチカート', 'ハープ', 'ティンパニ', 'ストリングアンサンブル 1', 'ストリングアンサンブル 2', 'シンセストリングス 1', 'シンセストリングス 2', '声「あー」', '声「おー」', 'シンセヴォイス', 'オーケストラヒット', 'トランペット', 'トロンボーン', 'チューバ', 'ミュートトランペット', 'フレンチ・ホルン', 'ブラスセクション', 'シンセブラス 1', 'シンセブラス 2', 'ソプラノサックス', 'アルトサックス', 'テナーサックス', 'バリトンサックス', 'オーボエ', 'イングリッシュホルン', 'ファゴット', 'クラリネット', 'ピッコロ', 'フルート', 'リコーダー', 'パンフルート', '茶瓶', '尺八', '口笛', 'オカリナ', '矩形波', 'ノコギリ波', 'カリオペ', 'チフ', 'チャランゴ', '声', 'フィフスズ', 'バス + リード', 'ファンタジア', 'ウォーム', 'ポリシンセ', 'クワイア', 'ボウ', 'メタリック', 'ハロー', 'スウィープ', '雨', 'サウンドトラック', 'クリスタル', 'アトモスフィア', 'ブライトネス', 'ゴブリン', 'エコー', 'サイファイ', 'シタール', 'バンジョー', '三味線', '琴', 'カリンバ', 'バグパイプ', 'フィドル', 'シャハナーイ', 'ティンクルベル', 'アゴゴ', 'スチールドラム', 'ウッドブロック', '太鼓', 'メロディックタム', 'シンセドラム', '逆シンバル', 'ギターフレットノイズ', 'ブレスノイズ', '海岸', '鳥の囀り', '電話のベル', 'ヘリコプター', '拍手', 'ガンショット'];
  $scope.tone = $scope.tones[0];
  $scope.scales = [{
    name: '半音階',
    value: 'normal'
  }, {
    name: 'メジャー',
    value: 'major'
  }, {
    name: '和風',
    value: 'japanese'
  }, {
    name: '沖縄',
    value: 'okinawa'
  }];
  $scope.scale = $scope.scales[0];

  // 効果音を演奏する
  $scope.play = function(name) {
    boombox.get(name).play();
  };

  // ポケットミクを準備
  Miku.init(function(miku) {
    miku.allSoundOff();

    // セレクトボックスの音色を変えた時の処理
    $scope.$watch('tone', function(val) {
      if (val === 'ミク') {
        defaultChannel();
      } else {
        var idx = $scope.tones.indexOf(val);
        programChange(idx - 1);
      }
    });

    getUserMedia({
      video: false,
      audio: true
    }).then(function(stream) {
      var input = audioContext.createMediaStreamSource(stream);

      // 音声入力からMIDIピッチ検出をする。
      MidiNoteDetector.from(input);

      var prevNote = 0; // 直前に鳴っていた音
      MidiNoteDetector.on('noteChange', function(e, note) {
        var filteredNote = filterNote(note);

        if (prevNote !== filteredNote) {
          moveNotesDisp(filteredNote);

          // 楽器音の場合はノートオフを送る
          if (miku.channel !== 0) miku.noteOff(prevNote, 127, 0);

          miku.noteOn(filteredNote, 127, 0);
          prevNote = filteredNote;
        }
      }).on('noteOff', function() {
        // 入力音が一定以下に小さくなった時は音を止める
        miku.allSoundOff();
      });

      // 入力音を直接音声出力する
      // input.connect(audioContext.destination);
    }, function(err) {
      alert(err);
    });

    // ミクボイス用チャンネルにする
    function defaultChannel() {
      miku.allSoundOff();
      miku.channel = 0;
    }

    // 楽器用チャンネルにして音色を変える
    function programChange(num) {
      miku.allSoundOff();
      miku.channel = 1;
      miku.programChange(num);
    }
  });

  // 検出したピッチをクオンタイズしてスケールに当てはめる
  function filterNote(rawNote) {
    // 半音階のときは何もしない
    if ($scope.scale.value === 'normal') return rawNote;

    var oct = Math.floor(rawNote / 12);
    var note = rawNote % 12;

    switch ($scope.scale.value) {
      // メジャー・スケール
      case 'major':
        switch (note) {
          case 1:
            note = 0;
            break;
          case 3:
            note = 2;
            break;
          case 6:
            note = 5;
            break;
          case 8:
            note = 7;
            break;
          case 10:
            note = 9;
            break;
        }
        break;
        // 和風
      case 'japanese':
        switch (note) {
          case 1:
            note = 0;
          case 3:
            note = 2;
            break;
          case 5:
          case 6:
            note = 4;
            break;
          case 8:
            note = 7;
            break;
          case 10:
          case 11:
            note = 9;
            break;
        }
        break;
        // 沖縄
      case 'okinawa':
        switch (note) {
          case 1:
          case 2:
          case 3:
            note = 0;
            break;
          case 6:
            note = 5;
            break;
          case 8:
          case 9:
          case 10:
            note = 7;
            break;
        }
        break;
    }

    return oct * 12 + note;
  }

  // 音名をアニメーション表示する
  function moveNotesDisp(noteNum) {
    var height = $("ul#note li").eq(0).height();
    $("ul#note").css("top", noteNum * height * -1);
  }
});
