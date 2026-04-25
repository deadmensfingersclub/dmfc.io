/* ============================================================
   Deadmen's Fingers Club — app.js
   SPA navigation + page content + QNA board logic
   ============================================================ */

// ===== QNA 데이터 (운영자가 여기에 추가/수정) =====
const qnaData = [
   {
    id: 5,
    title: '…',
    category: '…',
    date: '…',
    question: '…',
    answer: '…',
  },
  {
    id: 4,
    title: '동아리 겸직이 가능한지 알고 싶습니다.',
    category: '동아리',
    date: '2026-04-18',
    question: '나비난초회와 타 동아리를 겸직하고 있다는 설정이 가능할까요?',
    answer: '동아리 겸직은 가능한 설정이며, 캐릭터가 동아리 일정을 소화할 수 있다면 두 개뿐만 아니라 여러 동아리를 동시에 가입하여 활동해도 무방하니 자유로운 설정 부탁드립니다.',
  },
  {
    id: 3,
    title: '교복 관련 설정이 궁금합니다.',
    category: '캐릭터 외양',
    date: '2026-04-14',
    question: '외관 그림 첨부 시에는 원작 드라마의 교복을 착용하면 될까요? 따로 가이드나 규제(리폼)는 없을지 여쭤봅니다.',
    answer: '원작 드라마를 참고하여 교복 착용 부탁드리며, 원형을 크게 훼손하지 않는 선에서 리폼이 가능합니다. (ex. 원작에서 웬즈데이의 교복이 검정 톤으로 바뀐 것, 에이잭스 캐릭터가 교복 재킷 안에 지퍼형 후드를 입은 것, 치마와 바지의 길이·폭 수선, 크로스드레싱 등)\n최종 리폼 형태가 애매하다고 판단되신다면, QnA 창구에 문의해 주셔도 괜찮습니다. 내부 협의 후 답변드리도록 하겠습니다.',
  },
  {
    id: 2,
    title: '마스토돈 커뮤니티를 뛰어본 적이 없습니다.',
    category: '마스토돈',
    date: '2026-04-14',
    question: '마스토돈을 사용해본 적이 없는데, 커뮤니티 러닝이 가능할까요?',
    answer: '합격자 발표와 함께 마스토돈 서버 가입 방법부터 사용법을 기재한 가이드 문서를 제공할 예정입니다. 가이드 문서를 살피시고 이해가 가지 않거나 어려운 부분이 있다면 오픈 채팅을 통해 연락 부탁드리겠습니다.',
  },
  {
    id: 1,
    title: '〈웬즈데이〉 드라마를 아직 완주하지 못했습니다.',
    category: '신청서 접수',
    date: '2026-04-13',
    question: '넷플릭스 시리즈 〈웬즈데이〉를 아직 다 보지 못했는데, 합격에 불이익이 있나요?',
    answer: '시리즈를 완주하지 않아도 신청서 접수는 가능합니다.\n다만, 커뮤니티는 〈웬즈데이〉 세계관을 기반으로 운영되므로 최소한 작품의 주요 설정(네버모어 아카데미, 별종, 평범이 등)을 숙지하시길 권장합니다.\n세계관 페이지를 먼저 읽어보시면 참고가 됩니다.',
  },
];

// ===== 페이지 콘텐츠 (운영자가 HTML 태그로 내용을 작성하면 CSS 자동 적용) =====
const pages = {

  // ── 공지사항 ──────────────────────────────────────────────
  notice: () => {
    const tags = [
      'MSTD', '2007년생', '2244', 'All Gender', '글·그림 복합',
      '분위기 인장', '넷플릭스 시리즈 〈웬즈데이〉 기반', '15일',
      '1960년대', '시리어스', '스토리', '조사',
    ];

    const rules = [
      {
        num: '첫째',
        title: '우리는 자랑스러운 네버모어 아카데미의 일원으로서 현실과 허구를 혼동하지 않는다.',
        body: '커뮤니티에 등장하는 인물·단체·지역은 모두 허구이며, 현실과는 무관합니다.',
      },
      {
        num: '둘째',
        title: '우리는 네버모어 아카데미 내부의 사건을 교외에 발설하지 않는다.',
        body: '커뮤니티 내부의 구체적인 시스템과 스토리를 외부인에게 공유하지 않습니다.',
      },
      {
        num: '셋째',
        title: '아카데미 재학 중 발생하는 모든 문제와 분란은 정식 절차에 따라 보고한다.',
        body: '커뮤니티 내에서 발생한 모든 문제는 질문 및 건의 창구를 통해 연락합니다.',
      },
      {
        num: '넷째',
        title: '학칙을 읽지 않은 대가는 스스로 감당한다. 예외는 없다.',
        body: '공식 문서에 기재된 내용을 숙지하지 않아 발생하는 모든 불이익의 책임은 당사자에게 있습니다.',
      },
    ];

    const regHtml = `
      <p class="regulations-heading">▸ Detailed Regulations</p>
      <div class="regulation-list">

        <div class="regulation-item">
          <div class="regulation-label">A</div>
          <div class="regulation-body">나비난초회 Deadmen’s Fingers Club는 2022년 11월 23일에 첫 공개한 넷플릭스 오리지널 시리즈 <strong>〈웬즈데이〉를 기반</strong>으로 한 비공식 2차 창작 모임으로서 원작과 관련한 모든 저작물의 권리를 침해할 의도가 없음을 밝힙니다.</div>
        </div>

        <div class="regulation-item">
          <div class="regulation-label">B</div>
          <div class="regulation-body">커뮤니티 스토리 내에서는 인종, 젠더, 성적 지향 등에 따른 현실적인 차별 요소가 등장하지 않습니다. 다만, 원작 〈웬즈데이〉의 설정인 <strong>‘평범이’에 의한 ‘별종’ 차별</strong>은 다룹니다.<br>아울러 시대적 배경을 고려했을 때, 공식 스토리 외에 러너 캐릭터의 설정이나 활동 기간 내 RP 과정에서는 앞서 언급한 현실적 차별 요소가 서사를 위해 부분적으로 인용되거나 다뤄질 수 있습니다. 묘사의 수위는 러너분들의 자율적인 재량에 맡기나, <strong>신청서 트리거 워닝 표기나 RP 전 DM을 통한 충분한 사전 협의</strong>를 당부드립니다.</div>
        </div>

        <div class="regulation-item">
          <div class="regulation-label">C</div>
          <div class="regulation-body">본 커뮤니티는 <strong>2차 지인제</strong>로 <strong>2007년 이전 출생자만 신청서 제출</strong>이 가능합니다. 오너 연령 속임, 신원 사칭, 아이디 도용 등을 금지하며 적발 시 사전 고지 없이 즉시 제명 처리합니다. 제명 대상자는 커뮤니티에서 처음부터 존재하지 않았던 캐릭터로 취급하며 연락처 공유와 애프터 참여가 불가합니다.</div>
        </div>

        <div class="regulation-item">
          <div class="regulation-label">D</div>
          <div class="regulation-body">관계가 깨끗한 캐릭터만 재활용할 수 있으며, 선관은 허용하지 않습니다.</div>
        </div>

        <div class="regulation-item">
          <div class="regulation-label">E</div>
          <div class="regulation-body">커뮤니티 스토리 진행 과정에서 <strong>캐릭터의 성격이나 가치관, 특성이 변질</strong>되거나 <strong>통제 불가능한 상황</strong>에 놓일 수 있으며, 이에 대한 수용이 어려운 경우 참여를 권장하지 않습니다. <strong>캐릭터 변이 요소를 감안할 수 있는 분</strong>에 한해 지원 바랍니다.</div>
        </div>

        <div class="regulation-item">
          <div class="regulation-label">F</div>
          <div class="regulation-body">방송통신심의위원회 Safenet 등급을 기준으로 <strong>노출 2등급, 성행위 2등급, 폭력 4등급, 언어 4등급의 표현 수위</strong>를 따릅니다. 폭력과 언어가 4등급에 해당하나, ‘수프커(수위 프리 커뮤)’ 또는 ‘떡커’와는 다른 장르를 지향합니다. 특히 <strong>일간베스트나 소라넷 등 특정 커뮤니티에서 발발한 2차 가해 표현 및 성범죄 암시 단어의 사용을 금지</strong>하는 점 유의 바랍니다.</div>
        </div>

        <div class="regulation-item">
          <div class="regulation-label">G</div>
          <div class="regulation-body">
            <strong>로그 형태는 글·그림 모두 허용</strong>하나, 캐릭터 인장은 <strong>분위기 인장만 가능</strong>합니다.
            <span class="regulation-sub">가능: 사람의 신체 일부, 사람의 실루엣, 동물, 사물, 풍경, 단색 등</span>
            <span class="regulation-sub">불가능: 이목구비가 전부 드러나는 사람의 사진, 픽토그램, 객체 불문 AI 생성 이미지 등</span>
          </div>
        </div>

        <div class="regulation-item">
          <div class="regulation-label">H</div>
          <div class="regulation-body">자캐 커뮤니티가 <strong>처음이신 경우에도 신청서 제출이 가능</strong>합니다. 다만 원활한 진행을 위해 기본 용어 및 시스템을 사전에 숙지해 주시기 바라며, 그 외 문의 사항은 언제든 편히 공식 창구로 문의 부탁드립니다.</div>
        </div>

        <div class="regulation-item">
          <div class="regulation-label">I</div>
          <div class="regulation-body">커뮤니티 정비 및 내부 인원의 휴식을 위하여 <strong>5월 6일과 5월 12일 이틀간 안식일</strong>을 가집니다. 해당 일자에는 개인 로그 업로드를 제외한 모든 활동이 불가합니다. 아울러 새벽 타임라인 대화를 통한 특정 무리 형성 방지를 위해 <strong>매일 새벽 1시부터 아침 6시까지 퍼블릭 트윗 게시를 금지</strong>합니다. 기존 대화와 개인 로그 업로드는 가능합니다.</div>
        </div>

        <div class="regulation-item">
          <div class="regulation-label">J</div>
          <div class="regulation-body">예정된 러닝 인원은 <strong>최소 16명, 최대 20명</strong>입니다. 인원이 많지 않은 만큼 중도 하차 및 잠수는 지양 부탁드립니다.</div>
        </div>

        <div class="regulation-item">
          <div class="regulation-label">K</div>
          <div class="regulation-body">모두가 즐겁게 러닝하고 원활하게 운영될 수 있도록 서로 존중하는 마음을 가져주시길 바랍니다. 만약 RP 중 러너 간에 큰 감정싸움이나 분쟁이 발생할 우려가 있다면, 총괄계를 포함한 DM을 통해 조율을 진행해 주시길 부탁드립니다.</div>
        </div>

        <div class="regulation-item">
          <div class="regulation-label">L</div>
          <div class="regulation-body">커뮤니티에서 하차 또는 제명된 캐릭터와의 연락처 공유는 불가합니다. <strong>엔딩 후 2주 동안</strong> 캐릭터 간 상호 독점적 관계 설정을 금지합니다. 또한 TRPG, 밋짓시, 디스코드 소통, 짤 교환 등 일부 인원만 참여하거나 특정 러너가 소외감을 느낄 수 있는 행위 역시 허용되지 않습니다. (<strong>~2026.05.29. 11:59 p.m.</strong>)</div>
        </div>
      

        <div class="regulation-item">
          <div class="regulation-label">M</div>
          <div class="regulation-body">
            <strong>2회 경고</strong> 시 커뮤니티에서 <strong>제명</strong> 처리합니다. 아래의 경고 및 제명 사항 안내표를 참고하시어 러닝 중 불이익이 없도록 유의하시길 바랍니다.
            <div class="rule-lists-grid">
              <div class="warning-list-block">
                <div class="warning-list-title">⚠ 경고 사항</div>
                <ul class="warning-list">
                  <li>특정 젠더 또는 글·그림 매체에 따른 편파</li>
                  <li>시간 순서로 답을 주지 않는 행위</li>
                  <li>공지사항 악용을 통한 비매너 행위</li>
                  <li>이벤트와 메인 스토리 진행을 제외한 삼십 분 이상의 타임라인 대화</li>
                  <li>운영진이 확인할 수 없는 방식을 활용한 러너간 대화</li>
                  <li>초성 및 이모티콘 사용을 포함한 오너 개입과 메타 발언</li>
                  <li>위치란 대화</li>
                </ul>
              </div>
              <div class="ban-list-block">
                <div class="ban-list-title">✕ 제명 사항</div>
                <ul class="ban-list">
                  <li>커뮤니티 관련자를 대상으로 사이버불링을 유도하는 행위</li>
                  <li>오너 연령 속임</li>
                  <li>신원 사칭 또는 아이디 도용 행위</li>
                  <li>해당 커뮤니티에 제출한 캐릭터로 다른 커뮤니티를 동시에 접수 및 러닝하는 행위</li>
                  <li>둘 이상의 캐릭터로 신청서를 접수하거나 러닝하는 행위</li>
                  <li>엔딩 전 또는 하차자와의 연락처 공유 행위</li>
                  <li>신청서를 포함한 모든 창작물에 드러난 표절 또는 무단 도용 행위</li>
                  <li>러닝 중 자살·고백 로그 게재</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="regulation-item">
          <div class="regulation-label">N</div>
          <div class="regulation-body">
            질문 및 건의 사항은 오픈 채팅으로 연락 부탁드립니다. (9:00 a.m. ~ 12:00 a.m.)
            <br><a href="https://open.kakao.com/o/sewfH6pi" target="_blank" rel="noopener noreferrer" class="kakao-btn" style="text-decoration: none;">💬 카카오 오픈채팅 연결</a>
          </div>
        </div>

      </div>
    `;

    const ruleHtml = rules.map(r => `
      <div class="rule-card">
        <div class="rule-card-number">${r.num}</div>
        <div class="rule-card-title">${r.title}</div>
        <div class="rule-card-body">${r.body}</div>
      </div>
    `).join('');

    const tagHtml = tags.map(t => `<span class="tag">${t}</span>`).join('');

    return `
      <div class="page-wrap">
      <div class="notice-title">Deadmen's Fingers Club</div>

      <div class="tag-group">${tagHtml}</div>

      <p class="rules-heading">▸ Academy Regulations</p>
      <div class="rule-cards">${ruleHtml}</div>

      ${regHtml}

      <div class="chapter-section">
        <p class="chapter-heading">▸ Chapters</p>
        <div class="chapter-links">
          <a href="#" class="chapter-link" data-page="worldview" style="text-decoration: none;">
            <span class="chapter-link-icon" style="text-decoration: none;">📜</span>
            <span style="text-decoration: none;">
              Nevermore Academy
              <span class="chapter-link-label" style="text-decoration: none;">세계관으로 이동</span>
            </span>
          </a>
          <a href="#" class="chapter-link" data-page="application" style="text-decoration: none;">
            <span class="chapter-link-icon" style="text-decoration: none;">✒️</span>
            <span style="text-decoration: none;">
              Club Registration Form
              <span class="chapter-link-label" style="text-decoration: none;">신청서 양식으로 이동</span>
            </span>
          </a>
        </div>
      </div>
      </div>
    `;
  },

  // ── 세계관 ───────────────────────────────────────────────
  worldview: () => `
    <div class="page-wrap">
    <h1 class="worldview-title">네버모어 아카데미</h1>
    <span class="subtitle-cursive">“별종들을 위한, 별종들에 의한, 별종들의 학교!”</span>

    <p>……물론, 창립자인 너새니얼 포크너가 이렇게 말한 적은 없다. 그러므로 네버모어 아카데미가 1791년에 개교한 이래 <strong>1967년인 지금</strong>까지 별종 학생만 가르치는 이유는 전적으로 세상이 별종에게 가진 편견에 기인한다. 평범이 대부분은 별종과 함께 학창 시절을 보낼 바엔 코끼리에 냉장고 넣기를 택할 것이다. (코끼리에 냉장고를 넣는다고요? / 반대로 말하면 할 수 있을 것 같냐?)〈네버모어는 별종이 아닌 학생들도 환영한다〉는 말은 20세기 후반을 살아가는 평범이에게 냉장고의 모터 소리보다 무용한 셈이다. 이러한 불협화음 현상은 <strong>미국 동부의 소도시 제리코</strong>에 거주 중인 평범이들에게도 크게 다르지 않다─여기서 불행한 사실 하나. 네버모어 아카데미는 제리코에 있다.</p>

    <p>네버모어 아카데미는 문학, 과학, 음악, 식물학, 역사학 등 대학 입시에 필요한 과목부터 교양을 위한 학문까지 폭넓게 가르치며 에드거 앨런 포를 포함한 유명한 동문을 다수 배출했다. 거기에 더해 <strong>펜싱이나 양궁, 연극부, 양봉 활동 등 다양한 동아리 활동</strong>을 학생들에게 지원해주는 것으로 명성이 드높다. 그중 네버모어 아카데미에서 가장 유명한 동아리는, 바로…….</p>

    <hr>

    <h2>나비난초회</h2>
    <span class="subtitle-cursive">Deadmen's Fingers Club</span>

    <p>멕시코 출신의 영매 집단을 위시로 설립된 비밀 엘리트 사교 모임, 까마중회!<br>……의 존재를 아는 사람은 거의 없다. 비밀이라 명명하기 위해서는 그만한 품위와 조건을 갖춰야 하는 까닭이다─그러니 지금, 이 글을 읽는 당신 또한 까마중회의 존재를 모르는 것이다. 다만, 당신이 지금 네버모어에 어떤 형태로든 발을 걸친 상태라면 한 번쯤 나비난초회라는 동아리 이름을 들어봤으리라 자신한다. 이곳에 소속한 학생은 약 스무 명 남짓으로, 평범이들의 멸시와 위해를 피하여 별종으로서 자존감을 키우기 위해… 쉽게 말하자면, <strong>평범한 사교클럽</strong>이다.</p>

    <p>네버모어 아카데미에서 별종이라는 카테고리로 묶였으나, 한창 질풍노도를 보내고 있는 십대 청춘들이 조그만 교정에 갇혀 마찰 없는 시간을 보낼 수 있을 리는 없다. 그것은 십대 청춘이 아닌 중장년의 어른들에게도 몹시 어려운 일이므로 네버모어 아카데미는 어린 학생들을 위한 사교클럽을 만들었다. 요컨대 나비난초회는 ‘이 친구는 보름달만 보면 해가 뜰 때까지 하울링을 하지만 괜찮은 애야’, ‘저 친구가 네 머그에 혈액을 넣어둔 건 저주가 아닌 뜨거운 관심 표현이란다’ 같은 걸 하기 위해 만들어진 동아리란 뜻이다…….<br>각설.</p>

    <p>나비난초회에 소속한 네버모어의 학생은 <strong>각자 다양한 이유로 가입</strong>을 결심했다. 진실로 옆자리 무면인의 표정을 이해하고 싶어서, 고르곤 꼬시는 법 좀 알아보려고, 열심히 동아리 활동하기 귀찮아서, 룸메이트가 같이 가입하자 해놓고 혼자 도망쳐서, 오늘 가입하면 부장이 맛있는 거 사준다고 해서, 그날따라 하늘이 맑길래, 그냥, 어쩌고저쩌고.<br>무슨 이유가 됐든, 당신은 나비난초회에 가입 신청서를 낼 때까지만 해도 이 동아리의 회원들과 함께 <strong>어떤 사건</strong>에 휘말릴 거라곤 짐작하지 못했을 것이다.</p>

    <hr>

    <h2>그날의 우리들</h2>

    <p><strong>1967년 3월 26일 일요일.</strong><br>나비난초회 전원은 부활절을 맞이하여 <strong>‘소원을 들어주는 의식’</strong>을 진행했다. 그쯤 동아리에는 상반기 활동 보고서로 제출할 만한 일이 필요했고, 누군가가 꺼낸 ‘소원을 들어주는 의식’ 이야기가 동아리 인원 과반수의 흥미를 당긴 탓이었다─그 외 마땅한 의견을 낸 학생이 없기도 했다. 이런 이유로 당신은 <strong>네버모어 아카데미 내부와 근처 마을에서 ‘소원을 들어주는 의식’에 필요한 재료를 조달</strong>했다. 모든 준비를 마치기까지는 약 보름의 시간이 걸렸다.</p>

    <p>그러나 그날의 <strong>의식은 실패</strong>했다. 폭발이 일어나거나, 동아리실이 무너진 건 아니지만, 동아리실을 가득 채워두었던 촛불이 일시에 꺼지는 순간 그 자리에 있던 모두가 실패를 떠올렸다. 누군가는 하품했고, 또 다른 누군가는 그럴 줄 알았다며 시끄럽게 투덜거렸다. 우리의 그림자가 조금 더 길고, 어두워진 건 알아차리지 못한 채.</p>

    <p>그날 이후, 우리는 이성과 논리로 설명할 수 없는 <strong>사소한 불행과 사고</strong>에 시달리고 있다.</p>

    <div class="summary-block">
      <div class="summary-heading">▶ 정리하자면…</div>
      <ul class="summary-list">
        <li>당신은 1967년, 네버모어에 재학 중인 별종이다.</li>
        <li>당신은 나비난초회 소속이다. 동아리 활동에 얼마나 적극적이었는지는 자율에 맡긴다.</li>
        <li>당신은 1967년 3월 26일 일요일, 나비난초회 활동의 일환으로 ‘소원을 들어주는 의식’에 참여했다.</li>
        <li>당신은 ‘소원을 들어주는 의식’ 실패 후, 소지품을 잃어버리거나 갑자기 떨어진 장식품에 타박상을 입는 등 크고작은 불행을 겪고 있다.</li>
      </ul>
    </div>

    <hr>

    <h2>별종</h2>
    <span class="subtitle-cursive">Outcast</span>

    <p>사람이 모여 사는 곳이라면 으레 그렇듯, 네버모어 아카데미에도 나름의 주류와 비주류가 존재한다. 늑대인간, 고르곤, 뱀파이어, 세이렌은 이곳에서 일종의 ‘주류’에 속한다. 그러나 네버모어를 진정으로 네버모어답게 만드는 것은 다양성이므로, 이하에서 무면인을 포함한 몇몇 ‘비주류’ 별종도 소개한다.<br><span class="species-ref">주류 소개: 시즌 1의 1화 12분 26초~</span></p>

    <div class="species-grid">
      <div class="species-card">
        <div class="species-name">늑대인간</div>
        <div class="species-body">네버모어 아카데미 주류에 속하는 별종. ‘털가죽Furs’이라고도 불린다. 무리 짓는 것을 좋아하며, 일반인보다 신체 능력이 뛰어나고, 보름달이 뜨면 늑대인간으로 변한다. (늑대 각성 무렵, 자신을 제어하지 못하는 늑대인간들은 루핀 우리에 갇혀서 하루를 보내기도 한다) 네버모어에 재학 중인 늑대인간이라면 보통 늑대 각성을 마친 상태이겠으나, 평범이들의 2차 성징 시기가 제각각이듯 아직 각성을 마치지 못한 늑대인간이 존재할 수도 있다.</div>
        <div class="species-ref">원작 인물: 이니드 싱클레어 (시즌 1~시즌 2)</div>
      </div>
      <div class="species-card">
        <div class="species-name">고르곤</div>
        <div class="species-body">네버모어 아카데미 주류에 속하는 별종. ‘돌덩이Stoners’라고도 불린다. ……. 당신, 페르세우스의 손에 죽은 메두사라는 여인을 기억하는지. 그 여인은 세상 끝에 있는 고르곤의 섬에서 사망했는데, 그 이름을 딴 별종이 20세기인 지금까지 살아가고 있다. 고르곤의 머리카락은 메두사처럼 살아있는 뱀으로 이루어져 있으며, 이와 눈이 마주치면 예외 없이 석상으로 변한다. 심지어 자신조차도. 서너 시간 정도가 흐르면 다시 평소의 모습으로 돌아오지만, 위험 부담이 큰 탓에 모자를 쓰고 다니는 이들이 많다.</div>
        <div class="species-ref">원작 인물: 에이젝스 페트로폴루스 (시즌 1~시즌 2)</div>
      </div>
      <div class="species-card">
        <div class="species-name">뱀파이어</div>
        <div class="species-body">네버모어 아카데미 주류에 속하는 별종. ‘송곳니Fangs’라고도 불린다. 브람 스토커가 ‘드라큘라’라는 소설을 쓴 이후 평범이들 사이에서 큰 인지도를 얻게 되었는데, 그가 창작한 소설과 실제 뱀파이어 사이에는 제법 결정적인 차이점이 있다─실제 뱀파이어들은 낮에도 돌아다닐 수 있다. 단, 시력을 보호하는 수단을 사용하는 경우에. 은으로 만든 장신구를 착용할 수는 있으나, 실제로 마늘에는 약하다. 햇빛이 떠 있는 순간에도 움직일 수 있으나, 태양을 마주하면 눈알이 녹아버린다. 혈액을 주식으로 삼는데, 네버모어에 재학하는 뱀파이어들은 동물의 혈액 또는 평범이가 기부한 혈액을 섭취하며 살고 있다. 개중 몇몇은 수십 년째 네버모어 아카데미에 재학 중이라고 하나, 진위는 알 수 없다.</div>
        <div class="species-ref">원작 인물: 요코 타나카 (시즌 1)</div>
      </div>
      <div class="species-card">
        <div class="species-name">세이렌</div>
        <div class="species-body">네버모어 아카데미 주류에 속하는 별종. ‘비늘Scales’이라고도 불린다. 담수와 해수를 막론하고, 전신이 물속에 들어가면 반인반어의 모습으로 변한다. 육지에 있을 때에는 다른 별종이나 평범이처럼 두 발로 걷지만, 목소리로 타인을 조종할 수 있다는 특이점이 있다. 이런 특징 탓으로 보통 능력을 억제하는 액세서리를 상시 착용한다. 다만, 이조차 임시 방편이라는 인식이 강하여 세이렌과 그 주변 인물들은 서로간에 진실한 감정 교류를 하고 있는지 확신하지 못하는 경우가 많다.</div>
        <div class="species-ref">원작 인물: 비앙카 바클레이 (시즌 1~시즌 2)</div>
      </div>
      <div class="species-card">
        <div class="species-name">무면인(無面人)</div>
        <div class="species-body">무면인을 포함하여, 이하부터 서술하는 별종은 네버모어 아카데미의 ‘비주류’에 속한다. 무면인은 동북아시아권에서 묘사하는 달걀귀신과 몹시 닮았다. 얇은 가죽 또는 천을 뒤집어 쓴 것처럼 이목구비의 형태가 뚜렷하지 않으나, 의사소통에는 크게 무리가 없다. 생김을 제외하고서는 평범이와 크게 다른 면모는 없다.</div>
        <div class="species-ref">등장: 시즌 1 3화 3분 43초</div>
      </div>
      <div class="species-card">
        <div class="species-name">영매</div>
        <div class="species-body">특정 인물이나 사물, 장소에 접촉하는 순간 과거 혹은 미래의 사건을 환영처럼 목격하는 능력을 지녔다. 다만 이 능력은 언제나 단편적이고 파편적인 형태로 발현된다. 발현은 의지와 무관하게 일어나는 경우가 많고, 강한 감정이나 자극에 반응해 촉발되기도 한다. 이 과정에서 두통이나 감각 과부하를 겪는 일이 잦다. 같은 영매라도 능력의 양상에는 차이가 있어, 어떤 이는 비교적 선명한 장면을 포착하는 반면 어떤 이는 상징과 이미지에 가까운 단서만 받아들인다. 강령술이나 기타 주술 활동에 능하다.</div>
        <div class="species-ref">원작 인물: 웬즈데이 아담스 (시즌 1~시즌 2)</div>
      </div>
      <div class="species-card">
        <div class="species-name">다빈치</div>
        <div class="species-body">염동력을 기반으로 물체를 조작하거나 공간에 영향을 미치는 능력을 지녔다. 단순한 힘의 사용에 그치지 않고, 기계 장치나 구조물을 설계·제작하는 데 뛰어난 재능을 보이는 경우가 많다. 다만 이 능력은 안정적이지 않으며, 집중력과 정신 상태에 따라 출력과 정밀도가 크게 달라진다. 통제가 흐트러질 경우 의도와 다른 결과를 초래하거나, 주변 환경에 피해를 입히는 사례도 존재한다. 능력 발현은 오른손을 통해 이루어지며, 과도한 사용 시 극심한 피로와 신경계 부담을 동반한다.</div>
        <div class="species-ref">원작 인물(추정): 로언 라슬로 (시즌 1)</div>
      </div>
      <div class="species-card">
        <div class="species-name">투명인간</div>
        <div class="species-body">신체를 외부에서 인식할 수 없도록 만드는 능력을 지녔으며, 필요에 따라 모습을 감추는 방식으로 이를 활용한다. 이 능력은 시각적 인식에 직접적으로 작용하는 것으로 알려져 있으며, 사용 중에는 주변 환경과의 상호작용을 통해 존재가 간접적으로 드러날 수 있다. 다만 발현 조건이나 지속 시간 등 자세한 정보는 명확히 정리되어 있지 않으며, 개인에 따라 활용 방식과 범위에 차이가 존재한다.</div>
      </div>
      <div class="species-card">
        <div class="species-name">그 외</div>
        <div class="species-body">네버모어 아카데미는 모든 종류의 별종을 환영한다. (설정 조율 요청을 드릴 수 있습니다.)</div>
      </div>
    </div>
    </div>
  `,
   
// ── 시스템 ───────────────────────────────────────────────
  system: () => `
     <div class="page-wrap">
        <h2>변이</h2>
        <p>러닝 중 공개됩니다.</p>
        <hr>
        <h2>다이스 및 자동봇</h2>
        <p>개장 후 공개됩니다.</p>
     </div>
 `,
   
  // ── 신청서 양식 ──────────────────────────────────────────
  application: () => `
    <div class="app-page">
      <h1>신청서 양식</h1>

      <p class="app-info">
        제출 기간: 2026.04.19 00시 00분 ~ 2026.04.25 23시 59분<br>
        신청서는 구글폼으로 접수 받습니다.<br>
        수정은 최대 2회 가능하며, 수정 신청서 또한 구글폼으로 제출 부탁드립니다.<br>
        신청서 제목은 [ 캐릭터 이름｜나이｜기숙사｜별종 ] 로 통일합니다.<br>
        파란색 글씨는 신청서 제출 전 모두 삭제해 주세요.
      </p>

      <a href="https://docs.google.com/forms/d/e/1FAIpQLSdrEgRTgwnmGvK-1Ju5QmfsaqcfuIOxsYuZ890Cld_c1x93ng/viewform"
         target="_blank" rel="noopener noreferrer" class="app-btn app-btn-orange" style="text-decoration: none;">
        💌 신청서 접수하러 가기
      </a>

      <a href="https://docs.google.com/document/d/1bCQBZxYZ-t5yv_zcUneWABcZnKEgoFqq2kUd_bv0XA8/copy?usp=sharing"
         target="_blank" rel="noopener noreferrer" class="app-btn app-btn-orange" style="text-decoration: none;">
        ✒️ 신청서 양식 사본 만들기
      </a>

      <div class="app-table-wrap">
        <table class="app-table">
          <thead>
            <tr>
              <th>수정 횟수</th>
              <th>수정한 내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="hanmadi">한마디</div>

      <span class="field-label">[외관]</span>
      <p class="field-body">AI를 제외한 모든 형태의 이미지 임관 첨부를 허용합니다. 이미지 첨부는 필수가 아니며, 인장으로 사용하지 않는다면 그림 이미지 또한 해당 란에 첨부 가능합니다.</p>
      <p class="field-body"><strong>공백 포함 최대 1000자 이내</strong>로 서술 부탁드립니다.</p>

      <span class="field-label">[이름]</span>
      <p class="field-body">한국어｜원어</p>

      <span class="field-label">[별종]</span>
      <p class="field-body">늑대인간, 고르곤, 뱀파이어 등.<br>
      창작 설정의 경우 세부 설명 기입이 필수입니다.<br>
      <strong>공백 포함 최대 1000자 이내</strong>로 부탁드립니다.</p>

      <span class="field-label">[나이]</span>
      <p class="field-body">n세<br>
      15세~17세 사이. 이상의 스펙트럼에 해당된다면 종족에 따라 조정한 값 기입 가능.</p>

      <span class="field-label">[젠더 및 기숙사]</span>
      <p class="field-body">젠더 자유 서술. (ex. 시스젠더 여/남성, 에이젠더, 데미걸 등…….)<br>
      오필리어 홀Ophelia Hall｜칼라반 홀Caliban Hall｜퍼크 홀Puck Hall<br>
      해당되지 않는 항목은 삭제해 주세요. 룸메이트 배정에 사용됩니다.<br>
      오필리어 홀: 여성 스펙트럼<br>
      칼라반 홀: 남성 스펙트럼<br>
      퍼크 홀: 논바이너리 젠더퀴어</p>

      <span class="field-label">[신장/체중]</span>
      <p class="field-body">cm｜kg<br>
      대략적인 수치만 기입해도 괜찮습니다.<br>
      몸무게의 경우, 평균 또는 마름 등의 서술이 가능합니다.</p>

      <span class="field-label">[성격]</span>
      <p class="field-body">최소 3개의 키워드를 작성해 주세요.<br>
      키워드 제외 공백 포함 최대 1000자 이내로 서술 부탁드립니다.</p>

      <span class="field-label">[기타]</span>
      <p class="field-body">출신 국가, 나비난초회 가입 계기, ‘소원을 들어주는 의식’에 참여한 이유, 호불호, 취미, 특기 등 글자 수 제한 없이 편하게 서술 부탁드립니다.<br>
      1967년 무렵 미국 거주가 가능하며 영어로 소통이 가능할 경우 자유로운 국적 설정이 가능합니다.</p>

      <span class="field-label">[텍스트 관계]</span>
      <p class="field-body">합격자 발표 후 커뮤니티 개장까지 생성 가능합니다.</p>

      <hr class="app-divider">

      <h2>비공개 프로필</h2>

      <span class="field-label">[비밀 설정]</span>
      <p class="field-body">비밀 설정의 유무는 합격에 영향을 주지 않습니다.</p>

      <span class="field-label">[러닝IF]</span>
      <p class="field-body">간단히 작성하셔도 합격에 영향을 주지 않습니다.<br>
      ex) 친구들에게 죽기 직전까지 맞고 싶어요.</p>

      <span class="field-label">[오너 계정]</span>
      <p class="field-body">실제 사용하고 계신 아이디를 작성해 주세요.</p>

      <span class="field-label">[성인인증]</span>
      <p class="field-body">아래 첨부된 링크 도서의 ISBN 마지막 4자리를 기입해 주세요.</p>
      <a href="https://ridibooks.com/books/2284000005?_s=search&amp;_q=%EB%B6%88%EC%9A%B0%ED%95%9C+%EC%82%B6&amp;_rdt_sid=SearchBookListWithTab"
         target="_blank" rel="noopener noreferrer" class="app-btn" style="text-decoration: none;">
        📖 도서링크
      </a>
    </div>
  `,

  // ── QNA ─────────────────────────────────────────────────
  qna: () => {
    const rows = qnaData.map(item => `
      <tr class="board-row" data-id="${item.id}" tabindex="0" role="button" aria-expanded="false">
        <td>${item.id}</td>
        <td class="col-title">${item.title}</td>
        <td class="col-category"><span class="category-chip">${item.category}</span></td>
        <td class="col-date">${item.date}</td>
      </tr>
      <tr class="board-detail-row hidden" id="detail-${item.id}">
        <td colspan="4">
          <div class="board-detail-inner">
            <div class="board-detail-q">${item.question}</div>
            <div class="board-detail-a">${item.answer}</div>
          </div>
        </td>
      </tr>
    `).join('');

    return `
      <div class="page-wrap">
      <div class="board-header">
        <h1 style="margin:0; border:none; padding:0;">QNA</h1>
      </div>
      <p style="margin-bottom:20px;">자주 묻는 질문입니다. 행을 클릭하면 답변이 펼쳐집니다.</p>
      <div class="board-table-wrap">
        <table class="board-table" id="qnaTable">
          <thead>
            <tr>
              <th>No.</th>
              <th>제목</th>
              <th class="col-category">분류</th>
              <th class="col-date">날짜</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      </div>
    `;
  },
};

// ===== 네비게이션 공통 함수 =====
function navigate(pageKey) {
  const content = document.getElementById('content');

  // 페이지 콘텐츠 렌더링
  const renderFn = pages[pageKey];
  content.innerHTML = renderFn ? renderFn() : '<p>페이지를 찾을 수 없습니다.</p>';

  // 사이드바 active 업데이트
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === pageKey);
  });

  // QNA 페이지: 행 클릭 펼침/접기
  if (pageKey === 'qna') {
    document.querySelectorAll('.board-row').forEach(row => {
      row.addEventListener('click', () => toggleDetail(row));
      row.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleDetail(row);
        }
      });
    });
  }

  // 공지사항 chapter 링크 처리
  content.querySelectorAll('.chapter-link[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navigate(link.dataset.page);
    });
  });

  // 모바일: drawer 닫기
  closeDrawer();

  // 최상단으로 스크롤
  window.scrollTo(0, 0);
}

function toggleDetail(row) {
  const id = row.dataset.id;
  const detailRow = document.getElementById('detail-' + id);
  const isOpen = !detailRow.classList.contains('hidden');

  // 모두 닫기
  document.querySelectorAll('.board-detail-row').forEach(r => r.classList.add('hidden'));
  document.querySelectorAll('.board-row').forEach(r => {
    r.classList.remove('open');
    r.setAttribute('aria-expanded', 'false');
  });

  // 클릭한 행 토글
  if (!isOpen) {
    detailRow.classList.remove('hidden');
    row.classList.add('open');
    row.setAttribute('aria-expanded', 'true');
  }
}

// ===== 사이드바 네비게이션 이벤트 =====
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    navigate(item.dataset.page);
  });
});

// ===== 모바일 drawer 토글 =====
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() {
  sidebar.classList.add('open');
  sidebar.setAttribute('aria-hidden', 'false');
  menuToggle.setAttribute('aria-expanded', 'true');
  drawerOverlay.classList.add('active');
  document.body.classList.add('drawer-open');
}

function closeDrawer() {
  sidebar.classList.remove('open');
  sidebar.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');
  drawerOverlay.classList.remove('active');
  document.body.classList.remove('drawer-open');
}

menuToggle.addEventListener('click', () => {
  if (sidebar.classList.contains('open')) {
    closeDrawer();
  } else {
    openDrawer();
  }
});

drawerOverlay.addEventListener('click', closeDrawer);
drawerClose.addEventListener('click', closeDrawer);

// ESC 키로 drawer 닫기
document.addEventListener('keydown', e => {
  if (sidebar.classList.contains('open') && e.key === 'Escape') {
    closeDrawer();
  }
});

// ===== 초기 페이지 로드 =====
navigate('notice');
