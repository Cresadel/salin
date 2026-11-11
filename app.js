(function () {

  var $ = function (i) { return document.getElementById(i); };

  var LANGS = {
    en:  { name: "English", api: "en", rec: "en-US", tts: "en-US" },
    fil: { name: "Filipino", api: "tl", rec: "fil-PH", tts: "fil-PH" },
    ceb: { name: "Bisaya (Cebuano)", api: "ceb", rec: null, tts: "ceb-PH" }
  };

  var IDX = { en: 0, fil: 1, ceb: 2 };

  // Offline phrasebook: [English, Filipino, Bisaya]

  var DICT = [

    ["hello", "kumusta", "kumusta"], ["thank you", "salamat", "salamat"],
    ["good morning", "magandang umaga", "maayong buntag"], ["good evening", "magandang gabi", "maayong gabii"],
    ["how are you?", "kumusta ka?", "kumusta ka?"], ["where is the bathroom?", "nasaan ang banyo?", "asa ang kasilyas?"],
    ["how much is this?", "magkano ito?", "tagpila ni?"], ["i love you", "mahal kita", "gihigugma tika"],
    ["yes", "oo", "oo"], ["no", "hindi", "dili"], ["please", "pakiusap", "palihug"],
    ["i don't understand", "hindi ko maintindihan", "wala ko makasabot"],
    ["what is your name?", "ano ang pangalan mo?", "unsa imong ngalan?"],
    ["help me", "tulungan mo ako", "tabangi ko"], ["i am hungry", "gutom ako", "gigutom ko"],

    // Greetings and politeness

    ["hi", "kumusta", "kumusta"], ["good afternoon", "magandang hapon", "maayong hapon"],
    ["good night", "magandang gabi", "maayong gabii"], ["goodbye", "paalam", "babay"], ["bye", "paalam", "babay"],
    ["see you later", "kita tayo mamaya", "kita ta unya"], ["see you tomorrow", "kita tayo bukas", "kita ta ugma"],
    ["take care", "ingat ka", "amping"], ["welcome", "maligayang pagdating", "maayong pag-abot"],
    ["you're welcome", "walang anuman", "walay sapayan"], ["thanks", "salamat", "salamat"],
    ["thank you very much", "maraming salamat", "daghang salamat"], ["sorry", "pasensya na", "pasayloa ko"],
    ["i am sorry", "patawad", "pasayloa ko"], ["excuse me", "paumanhin po", "tabi lang"],
    ["i am fine", "mabuti ako", "maayo ra ko"], ["i am good", "mabuti ako", "maayo ra ko"],
    ["and you?", "ikaw naman?", "ikaw sad?"], ["nice to meet you", "ikinagagalak kitang makilala", "nalipay ko nga nakaila nimo"],
    ["what's your name?", "ano ang pangalan mo?", "unsa imong ngalan?"], ["my name is", "ang pangalan ko ay", "ang ngalan nako kay"],
    ["where are you from?", "taga saan ka?", "taga asa ka?"], ["how old are you?", "ilang taon ka na?", "pila na imong edad?"],

    // Basic replies

    ["maybe", "siguro", "tingali"], ["okay", "sige", "sige"], ["ok", "sige", "sige"], ["of course", "siyempre", "siyempre"],
    ["i know", "alam ko", "nahibalo ko"], ["i don't know", "hindi ko alam", "wala ko kahibalo"],
    ["i understand", "naiintindihan ko", "nakasabot ko"],
    ["do you speak english?", "marunong ka bang mag-english?", "kahibalo ka mag-english?"],
    ["please speak slowly", "pakiusap, magsalita ka nang dahan-dahan", "palihug hinay-hinaya ang pagsulti"],
    ["please repeat", "pakiulit po", "palihug balika"], ["can you help me?", "matutulungan mo ba ako?", "matabangan nimo ko?"],
    ["i need help", "kailangan ko ng tulong", "kinahanglan nako og tabang"],
    ["wait", "sandali lang", "hulat"], ["wait a moment", "sandali lang", "hulat sa gamay"],
    ["let's go", "tara na", "lakaw na ta"], ["come here", "halika dito", "ari diri"], ["stop", "tigil", "undang"],
    ["be careful", "mag-ingat ka", "pag-amping"],

    // Questions

    ["what is this?", "ano ito?", "unsa ni?"], ["what time is it?", "anong oras na?", "unsa nang oras?"],
    ["what are you doing?", "ano ang ginagawa mo?", "unsa imong gibuhat?"], ["what do you want?", "ano ang gusto mo?", "unsa imong gusto?"],
    ["where are you?", "nasaan ka?", "asa ka?"], ["where are we going?", "saan tayo pupunta?", "asa ta paingon?"],
    ["where is this?", "nasaan ito?", "asa ni?"], ["who are you?", "sino ka?", "kinsa ka?"],
    ["why?", "bakit?", "ngano?"], ["when?", "kailan?", "kanus-a?"], ["who?", "sino?", "kinsa?"],
    ["how?", "paano?", "unsaon?"], ["how many?", "ilan?", "pila?"], ["which one?", "alin?", "hain?"],
    ["how much?", "magkano?", "tagpila?"],

    // Feelings and needs

    ["i am thirsty", "nauuhaw ako", "giuhaw ko"], ["i am tired", "pagod ako", "gikapoy ko"],
    ["i am sleepy", "inaantok ako", "katulgon ko"], ["i am happy", "masaya ako", "malipayon ko"],
    ["i am sad", "malungkot ako", "masulob-on ko"], ["i am angry", "galit ako", "nasuko ko"],
    ["i am sick", "may sakit ako", "masakiton ko"], ["i am lost", "nawawala ako", "nawala ko"],
    ["i am full", "busog ako", "busog ko"], ["i am busy", "busy ako", "busy ko"],
    ["i miss you", "miss kita", "gimingaw ko nimo"], ["i like you", "gusto kita", "gusto tika"],
    ["i want water", "gusto ko ng tubig", "gusto ko og tubig"], ["i want to eat", "gusto kong kumain", "gusto ko mukaon"],
    ["it hurts", "masakit", "sakit"],

    // Food

    ["let's eat", "kain tayo", "kaon ta"], ["delicious", "masarap", "lami"], ["it is delicious", "masarap ito", "lami ni"],
    ["water", "tubig", "tubig"], ["food", "pagkain", "pagkaon"], ["rice", "kanin", "kan-on"], ["coffee", "kape", "kape"],

    // Shopping and money

    ["too expensive", "masyadong mahal", "mahal kaayo"], ["cheap", "mura", "barato"], ["money", "pera", "kwarta"],
    ["can i get a discount?", "pwede ba akong makakuha ng diskwento?", "pwede ba ko og diskwento?"],
    ["i want to buy this", "gusto kong bilhin ito", "gusto nako ni paliton"],

    // Directions and places

    ["left", "kaliwa", "wala"], ["right", "kanan", "tuo"], ["straight", "diretso", "diretso"],
    ["turn left", "kumaliwa ka", "liko sa wala"], ["turn right", "kumanan ka", "liko sa tuo"],
    ["stop here", "tumigil dito", "undang diri"], ["near", "malapit", "duol"], ["far", "malayo", "layo"],
    ["here", "dito", "diri"], ["there", "doon", "didto"],
    ["house", "bahay", "balay"], ["school", "paaralan", "eskwelahan"], ["i am going home", "uuwi na ako", "mopauli na ko"],
    ["i am studying", "nag-aaral ako", "nagtuon ko"],

    // Time

    ["now", "ngayon", "karon"], ["today", "ngayong araw", "karong adlawa"], ["tomorrow", "bukas", "ugma"],
    ["yesterday", "kahapon", "gahapon"], ["tonight", "ngayong gabi", "karong gabii"], ["later", "mamaya", "unya"],
    ["morning", "umaga", "buntag"], ["afternoon", "hapon", "hapon"], ["night", "gabi", "gabii"],

    // Numbers

    ["one", "isa", "usa"], ["two", "dalawa", "duha"], ["three", "tatlo", "tulo"], ["four", "apat", "upat"],
    ["five", "lima", "lima"], ["six", "anim", "unom"], ["seven", "pito", "pito"], ["eight", "walo", "walo"],
    ["nine", "siyam", "siyam"], ["ten", "sampu", "napulo"],

    // People

    ["mother", "nanay", "nanay"], ["father", "tatay", "tatay"], ["sister", "kapatid na babae", "igsoon nga babaye"],
    ["brother", "kapatid na lalaki", "igsoon nga lalaki"], ["friend", "kaibigan", "higala"], ["family", "pamilya", "pamilya"],
    ["child", "bata", "bata"], ["teacher", "guro", "magtutudlo"], ["student", "estudyante", "estudyante"],
    ["doctor", "doktor", "doktor"],

    // Emergency

    ["emergency", "emerhensya", "emerhensya"], ["fire", "sunog", "sunog"],
    ["call the police", "tumawag ng pulis", "tawga ang pulis"],
    ["i need a doctor", "kailangan ko ng doktor", "kinahanglan nako og doktor"],

    // Daily conversations and common expressions

    ["what's up?", "anong balita?", "unsa'y balita?"],
    ["nothing much", "wala naman", "wala ra man"],
    ["really?", "talaga?", "tinuod?"],
    ["that's true", "totoo iyan", "tinuod na"],
    ["that's okay", "ayos lang iyon", "okay ra na"],
    ["no problem", "walang problema", "walay problema"],
    ["don't worry", "huwag kang mag-alala", "ayaw kabalaka"],
    ["it's alright", "ayos lang", "okay ra"],
    ["i agree", "sang-ayon ako", "uyon ko"],
    ["i disagree", "hindi ako sang-ayon", "dili ko uyon"],
    ["that's enough", "sapat na iyan", "igo na na"],
    ["just a little", "kaunti lang", "gamay ra"],
    ["not yet", "hindi pa", "wala pa"],
    ["already", "na", "na"],
    ["of course not", "siyempre hindi", "syempre dili"],
    ["i think so", "sa tingin ko, oo", "murag oo"],
    ["i don't think so", "sa tingin ko, hindi", "murag dili"],
    ["that's good", "maganda iyan", "maayo na"],
    ["that's bad", "masama iyan", "dili maayo na"],
    ["what happened?", "anong nangyari?", "unsa'y nahitabo?"],
    ["nothing happened", "walang nangyari", "walay nahitabo"],
    ["i am on my way", "papunta na ako", "padulong na ko"],
    ["i am here", "nandito na ako", "naa na ko diri"],
    ["i am waiting", "naghihintay ako", "naghulat ko"],
    ["come with me", "sumama ka sa akin", "uban kanako"],
    ["follow me", "sundan mo ako", "sunod sa akoa"],
    ["leave it here", "iwan mo ito rito", "ibilin ni diri"],
    ["give me a moment", "bigyan mo ako ng sandali", "hatagi ko og kadiyot"],
    ["i will be back", "babalik ako", "mobalik ko"],
    ["see you soon", "magkita tayo sa lalong madaling panahon", "kita ta puhon"],

    // School and classroom

    ["what is our assignment?", "ano ang ating takdang-aralin?", "unsa atong assignment?"],
    ["i have homework", "may takdang-aralin ako", "naa koy assignment"],
    ["i forgot", "nakalimutan ko", "nakalimot ko"],
    ["i remember", "naaalala ko", "nahinumduman nako"],
    ["i am reviewing", "nagrerepaso ako", "nag-review ko"],
    ["what page?", "anong pahina?", "unsa nga panid?"],
    ["open your book", "buksan ang iyong aklat", "ablihi ang imong libro"],
    ["please explain", "pakipaliwanag", "palihug og pasabot"],
    ["i have a question", "may tanong ako", "naa koy pangutana"],
    ["may i ask something?", "maaari ba akong magtanong?", "pwede ko mangutana?"],
    ["i don't know the answer", "hindi ko alam ang sagot", "wala ko kahibalo sa tubag"],
    ["when is the deadline?", "kailan ang pasahan?", "kanus-a ang deadline?"],
    ["the class is over", "tapos na ang klase", "human na ang klase"],
    ["what time is our class?", "anong oras ang klase natin?", "unsa oras atong klase?"],
    ["i am late", "nahuli ako", "naulahi ko"],
    ["i am absent today", "liban ako ngayon", "absent ko karon"],
    ["please check my work", "pakisuri ang aking ginawa", "palihug tan-awa akong gibuhat"],

    // Home and household

    ["i am at home", "nasa bahay ako", "naa ko sa balay"],
    ["where is my phone?", "nasaan ang cellphone ko?", "asa akong cellphone?"],
    ["where are my keys?", "nasaan ang mga susi ko?", "asa akong mga yawe?"],
    ["clean your room", "linisin mo ang iyong kuwarto", "limpyohi imong kwarto"],
    ["wash the dishes", "hugasan ang mga pinggan", "hugasag mga plato"],
    ["i will clean later", "maglilinis ako mamaya", "maglimpyo ko unya"],
    ["the food is ready", "handa na ang pagkain", "andam na ang pagkaon"],
    ["the door is open", "bukas ang pinto", "abli ang pultahan"],
    ["close the door", "isara ang pinto", "sirad-i ang pultahan"],
    ["turn on the light", "buksan ang ilaw", "siga-i ang suga"],
    ["turn off the light", "patayin ang ilaw", "palonga ang suga"],
    ["i am going outside", "lalabas ako", "mogawas ko"],
    ["i am going to sleep", "matutulog na ako", "matulog na ko"],
    ["wake up", "gumising ka", "mata na"],

    // Transportation and getting around

    ["where is the bus stop?", "nasaan ang hintuan ng bus?", "asa ang hunongan sa bus?"],
    ["where can i ride a jeepney?", "saan ako maaaring sumakay ng jeepney?", "asa ko makasakay og jeepney?"],
    ["please stop here", "paki-hinto rito", "palihug hunong diri"],
    ["how long will it take?", "gaano ito katagal?", "dugay ba ni?"],
    ["i need a ride", "kailangan ko ng masasakyan", "kinahanglan kog masakyan"],
    ["i am going to school", "papunta ako sa paaralan", "moadto ko sa eskwelahan"],
    ["is it far from here?", "malayo ba ito mula rito?", "layo ba ni gikan diri?"],
    ["please take me there", "paki-dala ako roon", "palihug ihatod ko didto"],
    ["how much is the fare?", "magkano ang pamasahe?", "tagpila ang plete?"],
    ["i missed the bus", "naiwan ako ng bus", "naabtan ko sa pagbiya sa bus"],

    // Shopping and market

    ["how much per kilo?", "magkano kada kilo?", "tagpila kada kilo?"],
    ["i am just looking", "titingin-tingin lang ako", "nagtan-aw-tan-aw ra ko"],
    ["do you have another size?", "may iba pa ba kayong sukat?", "naa pa moy laing size?"],
    ["do you have another color?", "may iba pa ba kayong kulay?", "naa pa moy laing kolor?"],
    ["can i try this?", "pwede ko bang subukan ito?", "pwede nako ni sulayan?"],
    ["i will buy it", "bibilhin ko ito", "paliton nako ni"],
    ["i don't have change", "wala akong panukli", "wala koy sinsilyo nga ikasukli"],
    ["please give me a receipt", "pakibigay ang resibo", "palihug hatagi ko og resibo"],
    ["keep the change", "iyo na ang sukli", "imo na ang sukli"],
    ["that is too much", "sobra naman iyan", "sobra ra kaayo na"],

    // Food and ordering

    ["i would like to order", "gusto kong umorder", "mang-order unta ko"],
    ["what do you recommend?", "ano ang mairerekomenda mo?", "unsa imong ma-recommend?"],
    ["the menu, please", "pakibigay ang menu", "palihug hatag sa menu"],
    ["no spicy food, please", "huwag maanghang, pakiusap", "ayaw lang og halang, palihug"],
    ["less sugar, please", "kaunting asukal lang, pakiusap", "gamay ra nga asukar, palihug"],
    ["more rice, please", "dagdagan pa ng kanin, pakiusap", "dugangi pa og kan-on, palihug"],
    ["can i have some water?", "pwede bang makahingi ng tubig?", "pwede ko mangayo og tubig?"],
    ["the bill, please", "pakibigay ang bayarin", "palihug sa bill"],
    ["for here", "dito kakain", "dinhi ra mokaon"],
    ["to go, please", "pabalot na lang", "pa-takeout lang"],
    ["i am allergic to this", "may allergy ako rito", "alerdyik ko ani"],

    // Feelings, health, and personal needs

    ["i feel better", "mas mabuti na ang pakiramdam ko", "mas maayo na akong paminaw"],
    ["i don't feel well", "masama ang pakiramdam ko", "dili maayo akong paminaw"],
    ["i have a headache", "masakit ang ulo ko", "sakit akong ulo"],
    ["i have a stomachache", "masakit ang tiyan ko", "sakit akong tiyan"],
    ["i have a fever", "may lagnat ako", "gihilantan ko"],
    ["i need medicine", "kailangan ko ng gamot", "kinahanglan kog tambal"],
    ["please call my family", "pakitawagan ang pamilya ko", "palihug tawagi akong pamilya"],
    ["i am worried", "nag-aalala ako", "nabalaka ko"],
    ["i am excited", "nasasabik ako", "excited ko"],
    ["i am embarrassed", "nahihiya ako", "naulaw ko"],
    ["i am nervous", "kinakabahan ako", "gikulbaan ko"],
    ["i am proud of you", "ipinagmamalaki kita", "gipanghambog tika"],

    // Work and daily activities

    ["i am working", "nagtatrabaho ako", "nagtrabaho ko"],
    ["i am busy right now", "abala ako ngayon", "busy ko karon"],
    ["i will do it later", "gagawin ko mamaya", "buhaton nako unya"],
    ["i have finished", "tapos na ako", "nahuman na ko"],
    ["i am not finished yet", "hindi pa ako tapos", "wala pa ko mahuman"],
    ["please send me a message", "padalhan mo ako ng mensahe", "palihug padalhi ko og mensahe"],
    ["i will call you", "tatawagan kita", "tawagan tika"],
    ["my phone battery is low", "mahina na ang baterya ng cellphone ko", "hinay na ang baterya sa akong cellphone"],
    ["my phone is charging", "nagcha-charge ang cellphone ko", "nag-charge akong cellphone"],
    ["the internet is slow", "mabagal ang internet", "hinay ang internet"],
    ["i cannot connect", "hindi ako makakonekta", "dili ko makakonek"],

    // Useful short responses and commands

    ["come in", "pumasok ka", "sulod"],
    ["sit down", "umupo ka", "lingkod"],
    ["stand up", "tumayo ka", "barog"],
    ["listen carefully", "makinig nang mabuti", "paminaw og maayo"],
    ["look at this", "tingnan mo ito", "tan-awa ni"],
    ["don't touch it", "huwag mo itong hawakan", "ayaw ni hikapa"],
    ["be quiet", "tumahimik ka", "hilom sa"],
    ["hurry up", "bilisan mo", "pagdali"],
    ["slow down", "dahan-dahan lang", "hinay-hinay lang"],
    ["bring it here", "dalhin mo ito rito", "dad-a ni diri"],
    ["give it to me", "ibigay mo sa akin", "ihatag ni sa akoa"],
    ["leave me alone", "hayaan mo ako", "pasagdi lang ko"],
    ["tell me the truth", "sabihin mo sa akin ang totoo", "ingna ko sa tinuod"],
    ["keep it a secret", "ilihim mo ito", "ayaw isulti sa uban"],
    ["i will try", "susubukan ko", "sulayan nako"],
    ["let me see", "tingnan ko nga", "tan-awon sa nako"],
    ["that's all", "iyon lang", "mao ra to"],
    ["nothing else", "wala nang iba", "wala nay lain"],
    ["same as before", "katulad ng dati", "parehas sa una"],
    ["it depends", "depende", "depende"],
    ["i am not sure", "hindi ako sigurado", "dili ko sigurado"],
    ["maybe later", "siguro mamaya", "tingali unya"],
    ["not today", "hindi ngayon", "dili karon"],
    ["see you next time", "magkita tayo sa susunod", "kita ta sa sunod"]

  ];

  var MARK = {
    en: "the is are you and to what where how this that with have i'm it's do does",
    fil: "ang ng mga po ito ay na naman lang siya kayo hindi ako ikaw nasaan magkano ano kumusta salamat",
    ceb: "unsa nimo kaayo naa wala dili mao gikan palihug asa tagpila kay gyud atong ka'o ko nako imong ngalan"
  };

  var fromSel = $("from"), toSel = $("to"), input = $("input"), output = $("output"), statusEl = $("status");

  fromSel.add(new Option("Auto-detect", "auto"));
  Object.keys(LANGS).forEach(function (k) {
    fromSel.add(new Option(LANGS[k].name, k));
    toSel.add(new Option(LANGS[k].name, k));
  });

  fromSel.value = "en";
  toSel.value = "ceb";

  function get(k, d) {
    try { return JSON.parse(localStorage.getItem(k)) || d; }
    catch (e) { return d; }
  }

  function put(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); }
    catch (e) {}
  }

  var hist = get("salin-history", []), gloss = get("salin-gloss", {});
  var audioBlob = null, audioExt = "webm", reqId = 0;

  function say(msg, type) {
    statusEl.textContent = msg || "";
    statusEl.className = "status" + (type ? " " + type : "");
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function getOut() { return output.innerText.trim(); }

  // ---------- Theme and font size ----------

  var theme = get("salin-theme", "light"), fs = get("salin-fs", 16);

  function applyLook() {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.setProperty("--fs", fs + "px");
    document.documentElement.classList.toggle("big", fs > 16);
    $("theme").textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }

  $("theme").onclick = function () {
    theme = theme === "dark" ? "light" : "dark";
    put("salin-theme", theme);
    applyLook();
  };

  $("fPlus").onclick = function () {
    fs = Math.min(26, fs + 2);
    put("salin-fs", fs);
    applyLook();
  };

  $("fMinus").onclick = function () {
    fs = Math.max(12, fs - 2);
    put("salin-fs", fs);
    applyLook();
  };

  applyLook();

  // ---------- Tabs ----------

  document.querySelectorAll(".tab").forEach(function (b) {
    b.onclick = function () {
      document.querySelectorAll(".tab").forEach(function (x) {
        x.classList.toggle("on", x === b);
        x.setAttribute("aria-selected", x === b ? "true" : "false");
      });

      ["translate", "saved"].forEach(function (t) {
        $("t-" + t).classList.toggle("hide", t !== b.dataset.tab);
      });

      document.querySelector(".langs").classList.toggle("hide", b.dataset.tab === "saved");
      say("");
    };
  });

  // ---------- Language detection ----------

  function detect(text) {
    var words = text.toLowerCase().match(/[a-z'ñ]+/g) || [], best = null, top = 0;

    Object.keys(MARK).forEach(function (k) {
      var set = MARK[k].split(" "), n = 0;
      words.forEach(function (w) {
        if (set.indexOf(w) > -1) n++;
      });
      if (n > top) {
        top = n;
        best = k;
      }
    });

    return best || "en";
  }

  function srcLang(text) {
    return fromSel.value === "auto" ? detect(text) : fromSel.value;
  }

  // ---------- Translation ----------

  function chunks(text) {
    var parts = text.match(/[^.!?\n]+[.!?]?/g) || [text], out = [], cur = "", pieces = [];

    parts.forEach(function (p) {
      while (p.length > 450) {
        var cut = p.lastIndexOf(" ", 450);
        if (cut < 100) cut = 450;
        pieces.push(p.slice(0, cut));
        p = p.slice(cut);
      }
      pieces.push(p);
    });

    pieces.forEach(function (p) {
      if ((cur + p).length > 450) {
        if (cur) out.push(cur);
        cur = p;
      } else {
        cur += p;
      }
    });

    if (cur.trim()) out.push(cur);
    return out;
  }

  function dictLookup(text, from, to) {
    var norm = function (s) {
      return s.toLowerCase().replace(/[’']/g, "").replace(/[.!?,;:]+/g, "").replace(/\s+/g, " ").trim();
    };

    var n = norm(text);

    for (var i = 0; i < DICT.length; i++) {
      if (norm(DICT[i][IDX[from]]) === n) return DICT[i][IDX[to]];
    }

    return null;
  }

  // ---------- Offline AI engine (NLLB-200 running in the browser) ----------

  var NLLB = { en: "eng_Latn", fil: "tgl_Latn", ceb: "ceb_Latn" }, nllbPipe = null;

  async function nllbTranslate(text, from, to) {
    if (!nllbPipe) {
      say("Downloading the AI model (about 900 MB, first time only)…");

      var tf = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0/dist/transformers.min.js");

      nllbPipe = await tf.pipeline("translation", "Xenova/nllb-200-distilled-600M", {
        device: "wasm",
        dtype: "q8",
        progress_callback: function (p) {
          if (p.status === "progress") {
            say("Downloading the AI model… " + Math.round(p.progress) + "%");
          }
        }
      });
    }

    say("Translating with the offline AI…");

    var out = [], cs = chunks(text);

    for (var i = 0; i < cs.length; i++) {
      var r = await nllbPipe(cs[i], {
        src_lang: NLLB[from],
        tgt_lang: NLLB[to],
        max_new_tokens: 200
      });

      out.push(r[0].translation_text);
    }

    return out.join(" ");
  }

  var engineSel = $("engine"), devMode = /[?&]dev\b/.test(location.search);

  if (devMode) {
    $("engineBox").classList.remove("hide");
    engineSel.value = get("salin-engine", "mm");
  } else {
    engineSel.value = "mm";
  }

  engineSel.onchange = function () {
    put("salin-engine", engineSel.value);
  };

  async function tr(text, from, to) {
    if (from === to) return { t: text, how: "same" };

    var g = gloss[from + "|" + to + "|" + text.trim().toLowerCase()];
    if (g) return { t: g, how: "your correction" };

    // Common words and phrases are answered from the built-in phrasebook first
    var pb = dictLookup(text, from, to);
    if (pb) return { t: pb, how: "phrasebook" };

    var note = "online";

    if (engineSel.value === "nllb") {
      try {
        return { t: await nllbTranslate(text, from, to), how: "offline AI" };
      } catch (e) {
        note = "online, the AI model could not load";
      }
    }

    var quotaHit = false;

    try {
      var pieces = [], cs = chunks(text);

      for (var i = 0; i < cs.length; i++) {
        var out = null, gOut = null;

        try {
          gOut = await googleChunk(cs[i], from, to);
        } catch (ge) {}

        if (gOut !== null && !isBad(cs[i], gOut)) {
          out = gOut;
        } else {
          try {
            out = await mmChunk(cs[i], from, to);
            note = "online, backup service";
          } catch (qe) {
            if (qe && qe.quota) quotaHit = true;
          }

          if (out === null && gOut !== null) out = gOut;
        }

        if (out === null) throw new Error("failed");
        pieces.push(out);
      }

      return {
        t: pieces.join(" ").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&"),
        how: note
      };

    } catch (e) {
      var o = dictLookup(text, from, to);
      if (o) return { t: o, how: "offline phrasebook" };
      if (e) e.quota = quotaHit;
      throw e;
    }
  }

  // MyMemory sometimes returns junk such as just the word "Tagalog".
  var LANGNAMES = /^(tagalog|filipino|cebuano|bisaya|binisaya|english)$/i;

  function isBad(src, out) {
    var o = String(out || "").trim().toLowerCase(), s = String(src).trim().toLowerCase();

    if (!o) return true;
    if (LANGNAMES.test(o) && !LANGNAMES.test(s)) return true;
    if (/mymemory|invalid language|query length limit|please select/.test(o)) return true;

    var sw = s.split(/\s+/).length, ow = o.split(/\s+/).length;

    if (sw >= 3 && ow === 1) return true;
    if (sw >= 3 && o === s) return true;

    return false;
  }

  var ALT = { fil: ["tl-PH", "fil-PH"], ceb: ["ceb-PH"], en: ["en-US"] };

  async function mmChunk(q, from, to) {
    var targets = [LANGS[to].api].concat(ALT[to] || []), quota = false;

    for (var k = 0; k < targets.length; k++) {
      try {
        var r = await fetch("https://api.mymemory.translated.net/get?q=" + encodeURIComponent(q) + "&langpair=" + LANGS[from].api + "|" + targets[k]);

        var d = await r.json();

        if (Number(d.responseStatus) === 429) {
          quota = true;
          break;
        }

        if (Number(d.responseStatus) !== 200) continue;

        var list = [d.responseData.translatedText];

        (d.matches || []).slice().sort(function (a, b) {
          return (Number(b.match) || 0) - (Number(a.match) || 0);
        }).forEach(function (m) {
          list.push(m.translation);
        });

        for (var j = 0; j < list.length; j++) {
          if (!isBad(q, list[j])) return list[j];
        }

      } catch (e) {
        /* try the next code */
      }
    }

    if (quota) {
      var qe = new Error("quota");
      qe.quota = true;
      throw qe;
    }

    return null;
  }

  // Backup: used only when MyMemory gives a bad result, hits its limit, or fails

  async function googleChunk(q, from, to) {
    var r = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + LANGS[from].api + "&tl=" + LANGS[to].api + "&dt=t&q=" + encodeURIComponent(q));

    var d = await r.json();
    var s = (d[0] || []).map(function (x) { return x[0]; }).join("");

    if (!s) throw new Error("empty");
    return s;
  }

  var cache = {};

  // live = true: translating while the person is still recording (updates the box only,
  // keeps the "Listening…" message, and does not add to the Saved list yet)

  async function translateText(live) {
    live = live === true;

    var text = input.value.trim();

    if (!text) {
      if (!live) say("Type or record something first.", "warn");
      return;
    }

    var from = srcLang(text), to = toSel.value, id = ++reqId, key = from + "|" + to + "|" + text.toLowerCase();

    if (!live) {
      $("translate").disabled = true;
      say("Translating…");
    }

    try {
      var r = cache[key] || await tr(text, from, to);
      cache[key] = r;

      if (id !== reqId) return;

      output.textContent = r.t;

      if (!live) {
        say((fromSel.value === "auto" ? "Detected " + LANGS[from].name + ". " : "") + "Done (" + r.how + ").");
        addHist({ from: from, to: to, src: text, out: r.t, time: Date.now(), fav: false });
      }

    } catch (e) {
      if (id !== reqId) return;

      say(e && e.quota
        ? "The free daily translation limit was reached. Try again later. Short common phrases still work offline."
        : "Could not translate. Check your internet connection. Short common phrases still work offline.", "err");
    }

    if (id === reqId) $("translate").disabled = false;
  }

  $("translate").onclick = function () {
    translateText();
  };

  input.onkeydown = function (e) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) translateText();
  };
    // Changing the "To" language instantly shows the same text in that language

  toSel.onchange = function () {
    if (input.value.trim()) translateText();
  };

  // While recording, translate every ~1.2 seconds so the translation follows your voice

  var liveTimer = null;

  function scheduleLive() {
    if (liveTimer) return;

    liveTimer = setTimeout(function () {
      liveTimer = null;
      if (cur) translateText(true);
    }, 1200);
  }

  // ---------- Corrections (personal glossary) ----------
  // The button sits in the first box. It saves what is now in the translation box
  // as the correct translation of the text in the first box.

  $("fix").onclick = function () {
    var src = input.value.trim(), t = getOut();

    if (!src || !t) {
      say("Translate something first, edit the translation if needed, then press Save my correction.", "warn");
      return;
    }

    var from = srcLang(src), to = toSel.value;

    gloss[from + "|" + to + "|" + src.toLowerCase()] = t;
    put("salin-gloss", gloss);
    cache = {};

    for (var i = 0; i < hist.length; i++) {
      if (hist[i].from === from && hist[i].to === to && hist[i].src.toLowerCase() === src.toLowerCase()) {
        hist[i].out = t;
        break;
      }
    }

    put("salin-history", hist);
    renderList();
    say("Saved. This exact text will use your version from now on.");
  };

  $("clearGloss").onclick = function () {
    if (confirm("Delete all your saved corrections?")) {
      gloss = {};
      put("salin-gloss", gloss);
      say("Corrections cleared.");
    }
  };

  // ---------- Recording: speech to text + audio file ----------

  var SR = window.SpeechRecognition || window.webkitSpeechRecognition, cur = null, mr = null, chunksA = [], recId = 0, stopCurrent = null;

  function startAudio(tok) {
    if (!navigator.mediaDevices || !window.MediaRecorder) return;

    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (s) {
      if (!cur || tok !== recId) {
        s.getTracks().forEach(function (t) { t.stop(); });
        return;
      }

      chunksA = [];
      var rec = new MediaRecorder(s);

      mr = rec;

      rec.ondataavailable = function (e) {
        chunksA.push(e.data);
      };

      rec.onstop = function () {
        audioBlob = new Blob(chunksA, { type: rec.mimeType });
        audioExt = /ogg/.test(rec.mimeType) ? "ogg" : /mp4/.test(rec.mimeType) ? "m4a" : "webm";

        s.getTracks().forEach(function (t) { t.stop(); });
        $("dlAudio").disabled = false;
        if (mr === rec) mr = null;
      };

      rec.start();
    }).catch(function () {});
  }

  function toggleRec(btn, langKey, onText, onDone) {
    if (cur) {
      if (stopCurrent) stopCurrent();
      return;
    }

    if (!SR) {
      say("This browser has no voice recording. Use Chrome or Edge, or type your text.", "err");
      return;
    }

    var loc = LANGS[langKey].rec;

    if (!loc) {
      loc = "fil-PH";
      say("Browsers cannot recognize Bisaya yet, so Filipino is used. Expect mistakes and edit before translating.", "warn");
    } else {
      say("Listening… speak now.");
    }

    var label = btn.textContent, r = new SR(), text = "", done = false, fallback = null;

    function finish(abort) {
      if (done) return;
      done = true;
      clearTimeout(fallback);

      r.onresult = r.onerror = r.onend = null;

      if (abort) {
        try { r.abort(); } catch (e) {}
      }

      if (cur !== r) return;

      cur = null;
      stopCurrent = null;

      if (mr && mr.state !== "inactive") {
        try { mr.stop(); } catch (e) {}
      }

      btn.classList.remove("on");
      btn.textContent = label;

      onDone(text);
    }

    function requestStop() {
      btn.classList.remove("on");
      btn.textContent = label;

      if (mr && mr.state !== "inactive") {
        try { mr.stop(); } catch (e) {}
      }

      try {
        r.stop();
      } catch (e) {
        finish(true);
        return;
      }

      fallback = setTimeout(function () { finish(true); }, 900);
    }

    r.lang = loc;
    r.continuous = true;
    r.interimResults = true;

    r.onresult = function (ev) {
      text = "";

      for (var i = 0; i < ev.results.length; i++) {
        text += ev.results[i][0].transcript;
      }

      onText(text);
    };

    r.onerror = function (ev) {
      if (ev.error === "aborted") return;

      say(
        ev.error === "not-allowed"
          ? "Microphone access is blocked. Allow it in your browser settings."
          : ev.error === "no-speech"
            ? "I did not hear anything. Try again and speak closer to the mic."
            : "Recording error: " + ev.error,
        "err"
      );
    };

    r.onend = function () {
      finish(false);
    };

    try {
      r.start();
      cur = r;
      stopCurrent = requestStop;
      btn.classList.add("on");
      btn.textContent = "Stop";
      startAudio(++recId);
    } catch (e) {
      say("Could not start the microphone.", "err");
    }
  }

  $("mic").onclick = function () {
    var base = input.value.trim() ? input.value.trim() + " " : "";
    var auto = fromSel.value === "auto", key = auto ? (toSel.value === "en" ? "fil" : "en") : fromSel.value, wasRec = !!cur;

    toggleRec(
      $("mic"),
      key,

      function (t) {
        input.value = base + t;
        if ($("auto").checked) scheduleLive();
      },

      function (t) {
        clearTimeout(liveTimer);
        liveTimer = null;

        if (input.value.trim() && $("auto").checked) {
          translateText();
        } else if (t.trim()) {
          say("Recording stopped. Press Translate.");
        }
      }
    );

    if (auto && cur && !wasRec) {
      say("Listening in " + LANGS[key].name + ". Voice cannot use Auto-detect, so pick the language you speak in “From” for best results.", "warn");
    }
  };

  $("dlAudio").onclick = function () {
    if (audioBlob) save("recording." + audioExt, audioBlob);
  };

  // ---------- Read aloud (prefers a female voice) ----------

  var FEMALE = /female|woman|girl|zira|aria|jenny|michelle|blessica|samantha|victoria|karen|tessa|moira|fiona|allison|\bava\b|susan|zoe|kate|serena|libby|sonia|natasha|catherine|hazel|heera|emma|\bamy\b|joanna|salli|kimberly|ivy|kendra|nicole|monica|paulina|helena|laura|elsa|google us english|google filipino/i;

  var MALE = /david|\bmark\b|james|\bguy\b|christopher|eric|roger|steffan|daniel|\balex\b|\bfred\b|\btom\b|rocko|angelo|ryan|george|richard|brian|andrew|thomas|jorge|diego|oliver|arthur|aaron|gordon|bruce|ralph|albert|reed|eddy|grandpa|\bmale\b/i;

  function isFemale(v) {
    return FEMALE.test(v.name);
  }

  function isMale(v) {
    return !/female/i.test(v.name) && MALE.test(v.name);
  }

  function langOK(v, key) {
    var l = v.lang.replace("_", "-").toLowerCase();

    return key === "en"
      ? /^en/.test(l)
      : key === "fil"
        ? /^(fil|tl)/.test(l)
        : /^ceb/.test(l);
  }

  function pickVoice(vs, key) {
    var want = LANGS[key].tts.toLowerCase(), pool = vs.filter(function (v) {
      return langOK(v, key);
    }), fell = false;

    if (!pool.length && key === "ceb") {
      pool = vs.filter(function (v) {
        return langOK(v, "fil");
      });
      fell = true;
    }

    var best = null, top = -1e9;

    pool.forEach(function (v) {
      var s = 50
        + (v.lang.replace("_", "-").toLowerCase() === want ? 20 : 0)
        + (isFemale(v) ? 40 : 0)
        - (isMale(v) ? 60 : 0)
        + (v.localService ? 3 : 0);

      if (s > top) {
        top = s;
        best = v;
      }
    });

    return { voice: best, fell: fell };
  }

  function whenVoices(cb) {
    var vs = speechSynthesis.getVoices();

    if (vs.length) return cb(vs);

    var done = false;

    var f = function () {
      if (!done) {
        done = true;
        cb(speechSynthesis.getVoices());
      }
    };

    speechSynthesis.addEventListener("voiceschanged", f, { once: true });
    setTimeout(f, 600);
  }

  var speaking = null;

  function stopSpeaking() {
    var s = speaking;

    speaking = null;

    if (s) {
      if (s.timer) clearInterval(s.timer);
      if (s.utter) {
        s.utter.onend = null;
        s.utter.onerror = null;
      }
      if (s.btn) {
        s.btn.classList.remove("on");
        s.btn.textContent = s.label;
      }
    }

    if (window.speechSynthesis) {
      try {
        speechSynthesis.cancel();
        // Chrome keeps the queue paused after cancel; resume clears it.
        speechSynthesis.resume();
      } catch (e) {}
    }
  }

  function speechParts(text) {
    var ps = text.match(/[^.!?\n]+[.!?]*/g) || [text], out = [];

    ps.forEach(function (p) {
      p = p.trim();

      while (p.length > 200) {
        var cut = p.lastIndexOf(" ", 200);
        if (cut < 40) cut = 200;
        out.push(p.slice(0, cut));
        p = p.slice(cut).trim();
      }

      if (p) out.push(p);
    });

    return out.length ? out : [text];
  }

  function speak(text, key, btn) {
    if (!text) {
      say("Nothing to read yet.", "warn");
      return;
    }

    if (!window.speechSynthesis) {
      say("Read aloud is not supported in this browser.", "err");
      return;
    }

    if (speaking && speaking.btn === btn) {
      stopSpeaking();
      return;
    }

    stopSpeaking();

    var state = {
      btn: btn || null,
      label: btn ? btn.textContent : "Read aloud",
      utter: null,
      parts: speechParts(text),
      i: 0,
      timer: null
    };

    speaking = state;

    if (btn) {
      btn.textContent = "Stop";
      btn.classList.add("on");
    }

    state.timer = setInterval(function () {
      if (speaking === state && speechSynthesis.paused) speechSynthesis.resume();
    }, 5000);

    whenVoices(function (vs) {
      if (speaking !== state) return;

      var p = pickVoice(vs, key), v = p.voice, girl = v && isFemale(v), msg = [];

      if (p.fell) {
        msg.push("No Bisaya voice found, so Filipino is used. It may sound off.");
      }

      if (!girl) {
        msg.push("No female voice found on this device, so the voice pitch was raised.");
      } else {
        msg.push("Reading with " + v.name + ".");
      }

      say(msg.join(" "), p.fell || !girl ? "warn" : "");

      function next() {
        if (speaking !== state) return;

        if (state.i >= state.parts.length) {
          stopSpeaking();
          return;
        }

        var u = new SpeechSynthesisUtterance(state.parts[state.i++]);

        if (v) {
          u.voice = v;
          u.lang = v.lang;
        } else {
          u.lang = LANGS[key].tts;
        }

        if (!girl) u.pitch = 1.3;

        state.utter = u;

        u.onend = function () {
          if (speaking === state) next();
        };

        u.onerror = function (ev) {
          if (speaking !== state) return;
          if (ev.error === "interrupted" || ev.error === "canceled") return;
          stopSpeaking();
        };

        speechSynthesis.speak(u);
      }

      next();
    });
  }

  $("listenIn").onclick = function () {
    speak(input.value.trim(), srcLang(input.value), $("listenIn"));
  };

  $("listenOut").onclick = function () {
    speak(getOut(), toSel.value, $("listenOut"));
  };

  // ---------- Downloads: txt, doc, pdf, srt ----------

  function save(name, blob) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;

    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 1000);
  }

  function ts(s) {
    var p = function (n, l) {
      return String(n).padStart(l, "0");
    };

    var ms = Math.round((s % 1) * 1000);
    s = Math.floor(s);

    return p(Math.floor(s / 3600), 2) + ":"
      + p(Math.floor(s / 60) % 60, 2) + ":"
      + p(s % 60, 2) + ","
      + p(ms, 3);
  }

  function exportItems(items, fmt) {
    var head = function (it) {
      return LANGS[it.from].name + " → " + LANGS[it.to].name;
    };

    if (fmt === "txt") {
      return save(
        "translation.txt",
        new Blob([
          items.map(function (it) {
            return head(it) + "\n" + it.src + "\n" + it.out + "\n";
          }).join("\n----------\n\n")
        ], { type: "text/plain;charset=utf-8" })
      );
    }

    if (fmt === "srt") {
      var t = 0, n = 1, s = "";

      items.forEach(function (it) {
        (it.out.match(/[^.!?\n]+[.!?]?/g) || [it.out]).forEach(function (line) {
          var d = Math.max(2, line.trim().split(/\s+/).length * 0.45);

          s += n++ + "\n"
            + ts(t) + " --> " + ts(t + d) + "\n"
            + line.trim() + "\n\n";

          t += d;
        });
      });

      return save("subtitles.srt", new Blob([s], { type: "text/plain;charset=utf-8" }));
    }

    var html = "<html><head><meta charset='utf-8'><title>Salin</title><style>body{font-family:Segoe UI,Arial,sans-serif;padding:24px}h3{color:#2380c8;margin-bottom:4px}p{margin:2px 0}.s{color:#555}</style></head><body><h2>Salin translations</h2>"
      + items.map(function (it) {
        return "<h3>" + esc(head(it)) + "</h3><p class='s'>" + esc(it.src) + "</p><p><b>" + esc(it.out) + "</b></p>";
      }).join("")
      + "</body></html>";

    if (fmt === "doc") {
      return save("translation.doc", new Blob([html], { type: "application/msword" }));
    }

    var f = document.createElement("iframe");
    f.style.cssText = "position:fixed;width:0;height:0;border:0";

    document.body.appendChild(f);
    f.contentDocument.open();
    f.contentDocument.write(html);
    f.contentDocument.close();

    setTimeout(function () {
      f.contentWindow.focus();
      f.contentWindow.print();
      setTimeout(function () {
        f.remove();
      }, 1500);
    }, 300);

    say("In the print window, choose “Save as PDF”.");
  }
    $("download").onclick = function () {
    var o = getOut();

    if (!o) {
      say("Nothing to download yet.", "warn");
      return;
    }

    var from = srcLang(input.value);

    exportItems([
      {
        from: from,
        to: toSel.value,
        src: input.value.trim(),
        out: o
      }
    ], $("fmt").value);
  };

  $("dlAll").onclick = function () {
    if (!hist.length) {
      say("No saved translations yet.", "warn");
      return;
    }

    exportItems(hist, $("fmt").value);
  };

  // ---------- Saved list + favorites ----------

  function addHist(it) {
    var h = hist[0];

    if (h && h.from === it.from && h.to === it.to && h.src === it.src && h.out === it.out) {
      h.time = it.time;
      put("salin-history", hist);
      renderList();
      return;
    }

    hist.unshift(it);
    hist = hist.slice(0, 200);
    put("salin-history", hist);
    renderList();
  }

  function renderList() {
    var box = $("list"), only = $("favOnly").checked, shown = 0;

    stopSpeaking();
    box.innerHTML = "";

    hist.forEach(function (it, i) {
      if (only && !it.fav) return;

      shown++;

      var d = document.createElement("div");
      d.className = "item";

      d.innerHTML = "<div class='meta'>" + LANGS[it.from].name + " → " + LANGS[it.to].name + " · " + new Date(it.time).toLocaleString() + "</div><div class='src'>" + esc(it.src) + "</div><div class='out'>" + esc(it.out) + "</div>";

      var row = document.createElement("div");
      row.className = "row";

      [
        [
          it.fav ? "★ Favorite" : "☆ Favorite",
          function () {
            it.fav = !it.fav;
            put("salin-history", hist);
            renderList();
          }
        ],
        [
          "Read aloud",
          function () {
            speak(it.out, it.to, b);
          }
        ],
        [
          "Delete",
          function () {
            hist.splice(i, 1);
            put("salin-history", hist);
            renderList();
          }
        ]
      ].forEach(function (a) {
        var b = document.createElement("button");
        b.className = "btn sm";
        b.textContent = a[0];
        b.onclick = a[1];
        row.appendChild(b);
      });

      d.appendChild(row);
      box.appendChild(d);
    });

    if (!shown) {
      box.innerHTML = "<p class='none'>" + (
        only
          ? "No favorites yet. Tap the star on a saved translation."
          : "Nothing saved yet. Your translations will show up here."
      ) + "</p>";
    }
  }

  $("favOnly").onchange = renderList;

  $("clearAll").onclick = function () {
    if (confirm("Delete all saved translations?")) {
      hist = [];
      put("salin-history", hist);
      renderList();
    }
  };

  // ---------- Misc ----------

  $("copy").onclick = function () {
    var o = getOut();

    if (!o) {
      say("Nothing to copy yet.", "warn");
      return;
    }

    navigator.clipboard.writeText(o).then(
      function () {
        say("Copied.");
      },
      function () {
        say("Could not copy. Select the text and copy it manually.", "err");
      }
    );
  };

  $("clear").onclick = function () {
    reqId++;
    clearTimeout(liveTimer);
    liveTimer = null;
    stopSpeaking();
    input.value = "";
    output.textContent = "";
    $("translate").disabled = false;
    say("");
  };

  $("swap").onclick = function () {
    var f = fromSel.value === "auto" ? "en" : fromSel.value;

    fromSel.value = toSel.value;
    toSel.value = f;

    var o = getOut();

    if (o) {
      input.value = o;
      output.textContent = "";
    }
  };

  renderList();

})();