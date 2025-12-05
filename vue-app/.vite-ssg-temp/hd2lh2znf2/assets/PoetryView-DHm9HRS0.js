import { mergeProps, useSSRContext, resolveComponent } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../main.mjs";
import "vite-ssg";
import "vue-router";
import "@vueuse/head";
const poetryData = [
  {
    id: "el_bic",
    title: "@el_bic -- a cup of coffee, and a pen in hand",
    language: [
      "English",
      "Arabic"
    ],
    description: "This poem is the result of five years of reflection and growth, capturing the many phases of my life during that time. It weaves together a tapestry of emotions—joy and sorrow, triumphs and failures—while embodying both the unyielding spirit of a fighter and the quiet resignation that comes with the weariness of battle. At its core, this poem explores the duality of human nature: the constant clash between heart and mind, dreams and reality, logic and emotion.",
    content: [
      {
        text: "Have you heard about the story of the stoic man?",
        type: "verse"
      },
      {
        text: "Who wanted to reach the moon but got stuck on the land",
        type: "verse"
      },
      {
        text: "Who sought to free his mind but fallen in the demon's hand",
        type: "verse"
      },
      {
        text: "Behold of your reason, for this, is a story beyond humans to understand",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "I remember, I remember, Times I used to wonder",
        type: "verse"
      },
      {
        text: "I ever got to climb the rocks I was under",
        type: "verse"
      },
      {
        text: "will I ever let go of dreams, or am I a holder",
        type: "verse"
      },
      {
        text: "will there be someone who listens when I begin to stutter",
        type: "verse"
      },
      {
        text: "will I ever lose friends whom I did entrust with my back and shoulder",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "جلست مرة أتأمل",
        type: "verse"
      },
      {
        text: "فنجان قهوة بيدي",
        type: "verse"
      },
      {
        text: "و عقلي يسأل",
        type: "verse"
      },
      {
        text: "أتراه أنا حقا أنا",
        type: "verse"
      },
      {
        text: "أم أنا انسي أهمل",
        type: "verse"
      },
      {
        text: "هدفا..",
        type: "verse"
      },
      {
        text: "قرارا..",
        type: "verse"
      },
      {
        text: "أو حتى وزرا أثقل",
        type: "verse"
      },
      {
        text: "ظهرا ملئ بجروح",
        type: "verse"
      },
      {
        text: "حرب لا يعرف سببها",
        type: "verse"
      },
      {
        text: "أتساؤل لو غابت",
        type: "verse"
      },
      {
        text: "أتراها الدنيا كانت لتكون أجمل",
        type: "verse"
      },
      {
        text: "أتساؤل لو قلت",
        type: "verse"
      },
      {
        text: "أتراها كانت لتكون أسهل",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "oh, I remember, I remember, times I used to be a soldier",
        type: "verse"
      },
      {
        text: "In a war with what I thought was a commander",
        type: "verse"
      },
      {
        text: "Leading an army against a sole defender",
        type: "verse"
      },
      {
        text: "with a pen in hand - and a mind filled - with thoughts in disorder",
        type: "verse"
      },
      {
        text: "screaming to see the light - outside a mind - filled with clouds and thunder",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "رشفت رشفة من فنجان الحياة",
        type: "verse"
      },
      {
        text: "مرة هي الحياة",
        type: "verse"
      },
      {
        text: "أم هي مرارة القهوة",
        type: "verse"
      },
      {
        text: "أيقظت ذئبا عوى",
        type: "verse"
      },
      {
        text: "ما أقسى الحياة",
        type: "verse"
      },
      {
        text: "ذئبا روى",
        type: "verse"
      },
      {
        text: "عن هدوء الممات",
        type: "verse"
      },
      {
        text: "حيث لاصحب ولا بهات",
        type: "verse"
      },
      {
        text: "مصيرك أفعالك",
        type: "verse"
      },
      {
        text: "فإما تبات و جنات",
        type: "verse"
      },
      {
        text: "و إما نارا تنسيك الشهوات",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "oh, I remember, I remember, times I was filled with anger",
        type: "verse"
      },
      {
        text: "Treated like a complete stranger",
        type: "verse"
      },
      {
        text: "with a heart aching from pain, but was a withstander",
        type: "verse"
      },
      {
        text: "fighting against a cold brain that withheld and stayed sober",
        type: "verse"
      },
      {
        text: "awaken in a river filled with snakes on the 3rd of November",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "و ها أنا ذا جالس و فنجاني",
        type: "verse"
      },
      {
        text: "أحذق في قعره اللا نهائي",
        type: "verse"
      },
      {
        text: "آملا أن ألمح نبذة عن مستقبل مجهول",
        type: "verse"
      },
      {
        text: "بعيدا عن آمالي و آلامي",
        type: "verse"
      },
      {
        text: "أحدق بتمعن",
        type: "verse"
      },
      {
        text: "لعلي أرى طريقا في ظلمت بقايا القهوة",
        type: "verse"
      },
      {
        text: "التي تأبى ألا تزاح",
        type: "verse"
      },
      {
        text: "آملتا أن تشفي نحيب قلب ذئب",
        type: "verse"
      },
      {
        text: "لازال يبحث عن رمقة بومة الصباح",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "oh, I remember, I remember",
        type: "verse"
      },
      {
        text: "every second of being sober",
        type: "verse"
      },
      {
        text: "every time I was called a freakish outlander",
        type: "verse"
      },
      {
        text: "every time I was asked to stop being a pretender",
        type: "verse"
      },
      {
        text: "every time I was told just to surrender",
        type: "verse"
      },
      {
        text: "yes, I remember, the road that led to me shouting louder.",
        type: "verse"
      },
      {
        text: "I will never surrender",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "و ها أنا ذا مجددا",
        type: "verse"
      },
      {
        text: "أبحث عن من يقرأ فنجاني",
        type: "verse"
      },
      {
        text: "عن عرافة ربما تفقه اللعنات",
        type: "verse"
      },
      {
        text: "عن عالمة, تفقه في الكون و الذرات",
        type: "verse"
      },
      {
        text: "أبحث في القلب عن عقل",
        type: "verse"
      },
      {
        text: "و في العقل عن قلب",
        type: "verse"
      },
      {
        text: "كأنني أبحث عن نجمٍ",
        type: "verse"
      },
      {
        text: "في ليلٍ بلا سقف",
        type: "verse"
      },
      {
        text: "أسأل الظلام:",
        type: "verse"
      },
      {
        text: '"من أنا إن كان القلب يهيم؟',
        type: "verse"
      },
      {
        text: "ومن أكون إن كان العقل حكيم؟",
        type: "verse"
      },
      {
        text: "أأنا عابر بين الحلم واليقين؟",
        type: "verse"
      },
      {
        text: 'أم عالق بين الخيال والسكين؟"',
        type: "verse"
      },
      {
        text: 'عقلي يصرخ: "دع الشعر، فهو عبء ثقيل!"',
        type: "verse"
      },
      {
        text: 'وقلبي يهمس: "ما قيمة العلم بلا شعور جميل؟"',
        type: "verse"
      },
      {
        text: "كأن روحي شراع، تمزقه الرياح،",
        type: "verse"
      },
      {
        text: "بين بحر منطقٍ وصحراء الجراح.",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "رشفةٌ أخرى من فنجاني المرير،",
        type: "verse"
      },
      {
        text: "وأرى الذئب ينهض، عينيه من نار وحرير.",
        type: "verse"
      },
      {
        text: 'يسألني: "ألن تختار؟',
        type: "verse"
      },
      {
        text: 'إما جنون القلب، أو قسوة الأفكار!"',
        type: "verse"
      },
      {
        text: "فأجيبه، بصوتٍ مرتعش:",
        type: "verse"
      },
      {
        text: '"وما أنا سوى خليطٍ من نارٍ وجليد؟',
        type: "verse"
      },
      {
        text: "سجين بين عرشين، لا سلطان ولا سيد.",
        type: "verse"
      },
      {
        text: "أتوق للتحليق، لكن ظلي يحتاج القيود،",
        type: "verse"
      },
      {
        text: 'وأهرب من العقل، لكن أخشى الوجود."',
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "وها أنا ذا مجددا،",
        type: "verse"
      },
      {
        text: "أبحث عن ذاتي بين الورق والظلال،",
        type: "verse"
      },
      {
        text: "علني أجد جواباً،",
        type: "verse"
      },
      {
        text: "يشفي نحيبي",
        type: "verse"
      },
      {
        text: "يا فنجان الحياة، أما لديك حكمة؟",
        type: "verse"
      },
      {
        text: "هل أجد في قعر مرارتك حلماً",
        type: "verse"
      },
      {
        text: "أو في سوادك نجماً؟",
        type: "verse"
      }
    ],
    date: "2018-2023"
  },
  {
    id: "ana_alkalam",
    title: "أنا القلم",
    language: [
      "Arabic"
    ],
    description: "A poem expressing the voice of the pen and its relationship with the writer",
    content: [
      {
        text: "أنا القلم أتكلم ~~ بشعر بحره جاف مبهم",
        type: "verse"
      },
      {
        text: "أنا القلم أتكلم ~~ بحروف الضاد أخط طريقا ملهم",
        type: "verse"
      },
      {
        text: "أنا القلم أتكلم ~~ دمعي حبر يجف ولا يفهم",
        type: "verse"
      },
      {
        text: "أنا القلم أتكلم ~~ أفهل تصغ, أو تكمل سيرا نحو طريق مجهم",
        type: "verse"
      },
      {
        text: "قلمي لا يكذب ~~ صدقه يؤلمني",
        type: "verse"
      },
      {
        text: "يخبرني أني مذنب ~~ أتمنى لو يرحمني",
        type: "verse"
      },
      {
        text: "ألا يقحمني في دوام متعب ~~ أتمنى لو يتركني",
        type: "verse"
      },
      {
        text: "أشفى من كوني منحب ~~ لكن , صوته يلهمني",
        type: "verse"
      },
      {
        text: "يعلمني أني أطرب ~~ ذئبا يسكنني",
        type: "verse"
      },
      {
        text: "يشركني قلبا مترب",
        type: "verse"
      }
    ],
    date: "2020"
  },
  {
    id: "lguemra_moon",
    title: "lguemra - moon",
    language: [
      "Darija"
    ],
    description: "A poem in Moroccan dialect about the moon and its effect on lovers",
    content: [
      {
        text: "lguemra lounha loun rou7",
        type: "verse"
      },
      {
        text: "ri7ha n9i bri7 jenna yfou7",
        type: "verse"
      },
      {
        text: "mnnou bghramha che3rou nass fou9 lou7",
        type: "verse"
      },
      {
        text: "ya7ssra 3l lguemra chher fin trou7",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "bfra9ha nechfou lwa7 l3echa9",
        type: "verse"
      },
      {
        text: "w bghyabha sderhoum cha9 w da9",
        type: "verse"
      },
      {
        text: "Ya 7ssra 3lik ya haym ya dwa9",
        type: "verse"
      },
      {
        text: "fhbal l3ch9 ta9 w ba9",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "tssa9 fi b7er lhwam",
        type: "verse"
      },
      {
        text: "lahou fa9 lahou mrta7 filmnam",
        type: "verse"
      },
      {
        text: "tjla fi balhou lklam",
        type: "verse"
      },
      {
        text: "tbe3 rrja w tah ftri9 llwam",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "Eeh 3lik ya denya",
        type: "verse"
      },
      {
        text: "Re7mi 3bad ra9ou fi tri9 lbelya",
        type: "verse"
      },
      {
        text: "9lb kchef ytssayn fi berya",
        type: "verse"
      },
      {
        text: "Lounha 7mar bketret lfenya",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "Eeh yal3a9el Nwessik wssyya",
        type: "verse"
      },
      {
        text: "L9elb sa9el khyer mn alf 7jyya",
        type: "verse"
      },
      {
        text: "Lou7 chbak fi b7er rwa7ou n9yya",
        type: "verse"
      },
      {
        text: "L3ch9 rmman 7boubou skheyya",
        type: "verse"
      },
      {
        text: "Wlghder hwan yhechech ll7ob smeyya",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "Khellawha nass zman",
        type: "verse"
      },
      {
        text: "7di rassek a flan",
        type: "verse"
      },
      {
        text: "red balek mn nass hemmek 3lihoum han",
        type: "verse"
      },
      {
        text: "nta fi mkan whmmek 3ndhoum daan",
        type: "verse"
      }
    ],
    date: "2019"
  },
  {
    id: "me7boub",
    title: "me7boub",
    language: [
      "Darija"
    ],
    description: "A love poem in Moroccan dialect expressing deep affection",
    content: [
      {
        text: "Nedra fi 3inik jlatni fi gua3 llwan",
        type: "verse"
      },
      {
        text: "Teht fi ghemza wach ana fi l7ader wella fyam zman",
        type: "verse"
      },
      {
        text: "Nssit ghder lmadi ghre9t fle7da m3zouft lkaman",
        type: "verse"
      },
      {
        text: "chfat 9elb dib mermdat lou lwe9t chan",
        type: "verse"
      },
      {
        text: "zidih, zidi lou hebba fou9 lghram li ban",
        type: "verse"
      },
      {
        text: "zidih, zidi lou rejfa mn chfayfk l7nan",
        type: "verse"
      },
      {
        text: "re7mih ou zidi lou, zidih mn rou7ek rechfa, rahou bfra9ek bgha yjnan",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "Denya fi ghyabk rejfet 9ehwa ke7la",
        type: "verse"
      },
      {
        text: "Bla sekar, wf7dourek 3ssl 7our mn ne7la",
        type: "verse"
      },
      {
        text: "r7i9ha mn zehra seknet bir ma2ou dde7la",
        type: "verse"
      },
      {
        text: "R7i9ha mn zehra 3trat tri9 Twareg fi re7la",
        type: "verse"
      },
      {
        text: "Rakebha sekran brou7ha w bdkraha sta7la",
        type: "verse"
      },
      {
        text: "Ta7 f wa7et rmel w fkhroujha We7la",
        type: "verse"
      },
      {
        text: "Khli lklab yneb7ou Ou aji ns9iw rwa7na njoum west lkhla",
        type: "verse"
      },
      {
        text: "Nass t7ewess 3l njoum lfou9 wnti we7dek fsmaya fl3la",
        type: "verse"
      },
      {
        text: "Nass tjoul lb7oura w shoura w ana Rjaya fllah trssi fl klla",
        type: "verse"
      }
    ],
    date: "2017"
  },
  {
    id: "alshamteen",
    title: "الشامتين",
    language: [
      "Arabic"
    ],
    description: "A poem addressing critics and those who rejoice in others' misfortunes",
    content: [
      {
        text: "إنبحي يا كلاب",
        type: "verse"
      },
      {
        text: "إنثري في الجو اللعاب",
        type: "verse"
      },
      {
        text: "ضر كضرار كذوب كذاب",
        type: "verse"
      },
      {
        text: "تتلاشى أوهامه كتلاشي السراب",
        type: "verse"
      },
      {
        text: "أفليتك ارتقيت بأكل جثث الذئاب",
        type: "verse"
      },
      {
        text: "انبحي يا كلاب",
        type: "verse"
      },
      {
        text: "و فري من كل ذئب مهاب",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "لكن أنت غن فالصبح جاء",
        type: "verse"
      },
      {
        text: "قي نفسك من كل خبث باء",
        type: "verse"
      },
      {
        text: "استق بربك من الموت الفجاء",
        type: "verse"
      },
      {
        text: "و اترك كل من لمس أنفه السماء",
        type: "verse"
      },
      {
        text: "يمشي متبخترا مالئا الأرض داء",
        type: "verse"
      },
      {
        text: "كفاك اثما شراكهم معك الدماء",
        type: "verse"
      },
      {
        text: "فنقي دمك وطهره إلى ماء",
        type: "verse"
      },
      {
        text: "",
        type: "divider"
      },
      {
        text: "و قل للشامتين بك أهلا ، حسدكم قد مر هباء",
        type: "verse"
      },
      {
        text: "و قل للشامتين بك سهلا، خبثكم قد كان لي في الطريق ضياء",
        type: "verse"
      },
      {
        text: "و قل للشامتين بك مهلا، سيلقى الشامتون شر لقاء",
        type: "verse"
      },
      {
        text: "و ما للضعيف إلا الحمد و حسن الدعاء",
        type: "verse"
      }
    ],
    date: "2018"
  }
];
const _sfc_main$1 = {
  name: "PoetryCard",
  props: {
    poem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
      if (this.expanded) {
        this.$nextTick(() => {
          this.$el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    },
    isRTL(text) {
      const rtlRegex = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
      return rtlRegex.test(text);
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["poetry-card", { "expanded": $data.expanded }]
  }, _attrs))} data-v-17d34405><div class="card-header" data-v-17d34405><h3 data-v-17d34405>${ssrInterpolate($props.poem.title)}</h3><div class="card-meta" data-v-17d34405><!--[-->`);
  ssrRenderList($props.poem.language, (lang) => {
    _push(`<span class="language-badge" data-v-17d34405>${ssrInterpolate(lang)}</span>`);
  });
  _push(`<!--]--><span class="date-badge" data-v-17d34405>${ssrInterpolate($props.poem.date)}</span></div><div class="expand-toggle" data-v-17d34405><i class="${ssrRenderClass([{ "rotate": $data.expanded }, "fas fa-chevron-down"])}" data-v-17d34405></i></div></div>`);
  if ($data.expanded) {
    _push(`<div class="card-content" data-v-17d34405><p class="description" data-v-17d34405>${ssrInterpolate($props.poem.description)}</p><div class="poem-content" data-v-17d34405><!--[-->`);
    ssrRenderList($props.poem.content, (line, index) => {
      _push(`<!--[-->`);
      if (line.type === "divider") {
        _push(`<hr class="content-divider" data-v-17d34405>`);
      } else {
        _push(`<p class="${ssrRenderClass([{ "rtl": $options.isRTL(line.text) }, "verse"])}" data-v-17d34405>${ssrInterpolate(line.text)}</p>`);
      }
      _push(`<!--]-->`);
    });
    _push(`<!--]--></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/poetry/PoetryCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PoetryCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-17d34405"]]);
const _sfc_main = {
  name: "PoetryView",
  components: {
    PoetryCard
  },
  data() {
    return {
      poems: poetryData
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_PoetryCard = resolveComponent("PoetryCard");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "poetry view-container" }, _attrs))} data-v-15c7ff66><div class="section-content scrollable-content" data-v-15c7ff66><h1 data-v-15c7ff66>poetry</h1><div class="poetry-container" data-v-15c7ff66><!--[-->`);
  ssrRenderList($data.poems, (poem) => {
    _push(ssrRenderComponent(_component_PoetryCard, {
      key: poem.id,
      poem
    }, null, _parent));
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/views/PoetryView.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PoetryView = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-15c7ff66"]]);
export {
  PoetryView as default
};
