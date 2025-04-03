export type Station = {
  profile_image: string;
  station: {
    display: {
      main_type: string;
      title_type: string;
      title_text: string;
      profile_text: string;
      skin_type: number;
      skin_no: number;
      title_skin_image: string;
    };
    groups: {
      idx: number;
      group_no: number;
      priority: number;
      info: {
        group_name: string;
        group_class_name: string;
        group_background_color: string;
      };
    }[];
    menus: {
      bbs_no: number;
      station_no: number;
      auth_no: number;
      w_auth_no: number;
      display_type: number;
      rnum: number;
      line: number;
      indention: number;
      name: string;
      name_font: number;
      main_view_yn: number;
      view_type: number;
    }[];
    upd: {
      station_no: number;
      user_id: string;
      asp_code: number;
      fan_cnt: number;
      today0_visit_cnt: number;
      today1_visit_cnt: number;
      total_visit_cnt: number;
      today0_ok_cnt: number;
      today1_ok_cnt: number;
      today0_fav_cnt: number;
      today1_fav_cnt: number;
      total_ok_cnt: number;
      total_view_cnt: number;
    };
    vods: {
      bbs_no: number;
      station_no: number;
      auth_no: number;
      w_auth_no: number;
      display_type: number;
      rnum: number;
      line: number;
      indention: number;
      name: string;
      name_font: number;
      main_view_yn: number;
      view_type: number;
    }[];
    sns: {
      id: number;
      user_id: string;
      type: number;
      channel_id: string;
      playlist_id: string;
      title: string;
      followers: number;
      state: number;
      expire_at: string;
      created_at: string;
      updated_at: string;
    }[];
    broad_start: string;
    grade: number;
    jointime: string;
    station_name: string;
    station_no: number;
    station_title: string;
    total_broad_time: number;
    user_id: string;
    user_nick: string;
    active_no: number;
  };
  broad: {
    user_id: string;
    broad_no: number;
    broad_title: string;
    current_sum_viewer: number;
    broad_grade: number;
    is_password: boolean;
  } | null;
  starballoon_top: {
    user_id: string;
    user_nick: string;
    profile_image: string;
  }[];
  sticker_top: {
    user_id: string;
    user_nick: string;
    profile_image: string;
  }[];
  subscription: {
    count: number;
  };
  is_best_bj: boolean;
  is_partner_bj: boolean;
  is_sports_bj: boolean;
  is_ppv_bj: boolean;
  is_af_supporters_bj: boolean;
  is_shopfreeca_bj: boolean;
  is_favorite: boolean;
  is_subscription: boolean;
  is_owner: boolean;
  is_manager: boolean;
  is_notice: boolean;
  is_adsence: boolean;
  is_mobile_push: boolean;
  subscribe_visible: string;
  country: string;
  current_timestamp: string;
};

export type StreamInfo = StreamInfoOnline | StreamInfoOffline;

export type StreamInfoOnline = {
  CHANNEL: {
    geo_cc: string;
    geo_rc: string;
    acpt_lang: string;
    svc_lang: string;
    ISSP: number;
    RESULT: 1;
    LOWLAYTENCYBJ: number;
    VIEWPRESET: [[Object], [Object], [Object], [Object], [Object]];
    PBNO: string;
    BNO: string; // 방송 id
    BJID: string; // 스트리머 id
    BJNICK: string; // 스트리머 닉네임
    BJGRADE: number;
    STNO: string;
    ISFAV: string;
    CATE: string;
    CPNO: number;
    GRADE: string;
    BTYPE: string;
    CHATNO: string;
    BPWD: 'N' | 'P'; // 비번방?
    TITLE: string; // 방송제목
    BPS: string; // 비트레이트
    RESOLUTION: string; // 해상도
    CTIP: string;
    CTPT: string;
    VBT: string;
    CTUSER: number;
    S1440P: number;
    AUTO_HASHTAGS: string[];
    CATEGORY_TAGS: string[];
    HASH_TAGS: string[];
    CHIP: string; // 채팅방 ip
    CHPT: string; // 채팅방 포트
    CHDOMAIN: string; // 채팅방 도메인
    GWIP: string;
    GWPT: string;
    STYPE: string;
    CDN: string;
    RMD: string;
    ORG: string;
    MDPT: string;
    BTIME: number;
    DH: number;
    WC: number;
    PCON: number;
    PCON_TIME: number;
    PCON_MONTH: string[];
    PCON_OBJECT: { tier1: SubscriptionBadge[]; tier2: SubscriptionBadge[] };
    FTK: string;
    BPCBANNER: boolean;
    BPCCHATPOPBANNER: boolean;
    BPCTIMEBANNER: boolean;
    BPCPOSTROLL: string;
    BPCPREROLL: string;
    MIDROLL: {
      VALUE: string;
      OFFSET_START_TIME: number;
      OFFSET_END_TIME: number;
    };
    PREROLLTAG: string;
    MIDROLLTAG: string;
    POSTROLLTAG: string;
    BJAWARD: false;
    BJAWARDWATERMARK: false;
    BJAWARDYEAR: string;
    GEM: boolean;
    GEM_LOG: boolean;
    CLEAR_MODE_CATE: string[];
    PLAYTIMINGBUFFER_DURATION: string;
    STREAMER_PLAYTIMINGBUFFER_DURATION: string;
    MAXBUFFER_DURATION: string;
    LOWBUFFER_DURATION: string;
    PLAYBACKRATEDELTA: string;
    MAXOVERSEEKDURATION: string;
  };
};

export type StreamInfoOffline = {
  CHANNEL: {
    geo_cc: string;
    geo_rc: string;
    acpt_lang: string;
    svc_lang: string;
    ISSP: number;
    RESULT: 0;
  };
};

export type SubscriptionBadge = {
  MONTH: number;
  FILENAME: string;
};

export type SignatureEmoteResponse = {
  result: 1;
  data: SignatureEmote[];
  img_path: string;
  tier_type: number;
  version: number;
};

export type SignatureEmote = {
  title: string;
  tier_type: 1 | 2 | 3;
  pc_img: string;
  mobile_img: string;
  pc_alternate_img: string;
  mob_alternate_img: string;
  move_img: 'Y' | 'N';
  order_no: string;
  black_keyword: 'Y' | 'N';
};
