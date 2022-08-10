//http://127.0.0.1:8000/community/main/mypage/
//http://127.0.0.1:8000/article/mypage/

// 가입 신청 대기 목록 아이템 HTML 받기
function get_request_signin_item(requestId, community_name, date) {
    return `
        <tr data-request-id="${requestId}">
            <td>${community_name}</td>
            <td>${date}</td>
            <td><button onclick="cancel_request_signin_community(this);">신청 취소</button></td>
        <tr>
    `;
}

// 가입 요청 대기 목록 아이템 HTML 받기
function get_response_signin_item(requestId, community_name, user_name, date) {
    return `
        <tr data-request-id="${requestId}">
            <td>${community_name}</td>
            <td>${user_name}</td>
            <td>${date}</td>
            <td><button onclick="accept_response_signin_community(this);">승인</button></td>
            <td><button onclick="cancel_response_signin_community(this);">취소</button></td>
        <tr>
    `;
}

// [목록 불러오기]
// 가입 신청 대기 목록 불러오기
async function load_request_signin_community() {
    // User의 인증 정보
    const user_id = localStorage.getItem('payload');

    // [TODO]
    // 해당 유저가 가입을 신청해서 대기 중인 요청들의 정보를 가져옴
    const response = await fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            user_id: user_id
        }),
    });

    response_json = await response.json();

    // 해당 정보들을 보여줄 Table
    const table = document.GetElementById("request_signin_table");

    // [TODO]
    // 아이템 목록을 서버의 결과로 부터 받아옴
    // const item_list = response_json.
    const item_list = [];

    // 아이템을 차례대로 추가
    for(i = 0; i < item_list.length; i++) {
        let item_content = item_list[i];
        table.append(
            get_request_signin_item(
                item_content.requestId, 
                item_content.communityName,
                item_content.date
            )
        );
    }
}

// 가입 요청 대기 목록 불러오기
async function load_response_signin_community() {
    const user_id = localStorage.getItem('payload');

    // [TODO]
    // 해당 유저가 주인인 커뮤니티에 가입 승인을 요청한 목록 정보를 가져옴
    const response = await fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            user_id: user_id
        }),
    });

    response_json = await response.json();

    // 해당 정보들을 보여줄 Table
    const table = document.GetElementById("response_signin_table");
    
    // [TODO]
    // 아이템 목록을 서버의 결과로 부터 받아옴
    const item_list = [];
    
    // 아이템을 차례대로 추가
    for(i = 0; i < item_list.length; i++) {
        let item_content = item_list[i];
        table.append(
            get_response_signin_item(
                item_content.requestId, 
                item_content.communityName,
                item_content.date
            )
        );
    }
}

// [처리 함수]
// 승인 요청한 사람이, 승인을 취소하는 작업
async function cancel_request_signin_community(item) {
    const requestId = item.dataset.requestId;

    const formdata = new FormData();
    formdata.append('request_id', requestId);    
    
    // [TODO]
    // 가입 승인 취소 요청
    const response = await fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: formdata
    });

    response_json = await response.json();

    // 작업 성공시 해당 아이템을 Table에서 삭제
    if (response.status == 200) {
        const table = document.GetElementById("request_signin_table");
        table.remove(item);
    } else {
        alert('확인 할 수 없는 요청입니다.');
    }
}

// 커뮤니티 주인이 승인 요청을 취소하는 작업
async function cancel_response_signin_community(item) {
    const requestId = item.dataset.requestId;

    const formdata = new FormData();
    formdata.append('request_id', requestId);

    // [TODO]
    // 가입 승인 취소 요청
    const response = await fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: formdata
    });

    response_json = await response.json();

    // 작업 성공시 해당 아이템을 Table에서 삭제
    if (response.status == 200) {
        const table = document.GetElementById("response_signin_table");
        table.remove(item);
    } else {
        alert('확인 할 수 없는 요청입니다.');
    }
}

// 커뮤니티 주인이 승인 요청을 승인하는 작업
async function accept_response_signin_community(item) {
    const requestId = item.dataset.requestId;

    const formdata = new FormData();
    formdata.append('request_id', requestId);

    // [TODO]
    // 가입 승인 허락 요청
    const response = await fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
        },
        body: formdata
    });

    response_json = await response.json();

    // 작업 성공시 해당 아이템을 Table에서 삭제
    if (response.status == 200) {
        const table = document.GetElementById("response_signin_table");
        table.remove(item);
    } else {
        alert('확인 할 수 없는 요청입니다.');
    }
}

async function get_mypage_details() {
    await fetch(`http://127.0.0.1:8000/user/mypage`, {
        headers:{
            Authorization : "Bearer " + localStorage.getItem("access"),
        },
    })
    .then((response) => response.json())
    .then((result) => {
        const username = document.getElementById('mypage_username')
        username.innerText = result.username
        const user_id = document.getElementById("mypage_user_id")
        user_id.innerText = result.user_id

        const joined_community = document.getElementById("mypage_joined_community")
        for (i=0; i<result.userandcommunity_set.length; i++) {
            let joined_community_info = document.createElement('tr')
            joined_community_info.innerHTML = `
                                            <td>${result.userandcommunity_set[i].community_name}</td>                        
                                            <td>
                                                <button id="community_wihtdraw_${result.userandcommunity_set[i].community}">탈퇴하기</button>
                                            </td>                       
                                            `
            joined_community.append(joined_community_info)

            for (j=0; j<result.userandcommunity_set[i].community_request.length; j++) {
                const response_signin = document.getElementById("response_signin_table")
                const community_request = result.userandcommunity_set[i].community_request[j]
                if (community_request.user === result.user_id) {
                    continue;
                }
                let response_signin_info = document.createElement('tr')
                response_signin_info.innerHTML = `
                                                <td>${community_request.community}</td>
                                                <td>${community_request.user}</td>
                                                <td>${community_request.date.slice(0, 10)}</td>
                                                <td>
                                                    <button id="response_signin_accept_${community_request.id}" onclick="accept_response_signin(this.id)">승인</button>
                                                </td>
                                                <td>
                                                    <button id="response_signin_decline_${community_request.id}" onclick="decline_response_signin(this.id)">취소</button>
                                                </td>
                                                `
                response_signin.append(response_signin_info)
                }
            }
        
        const written_article = document.getElementById("mypage_written_article")
        for (i=0; i<result.article_set.length; i++) {
            let written_article_info = document.createElement("tr")
            written_article_info.innerHTML = `
                                            <td>${result.article_set[i].communit_name}</td>
                                            <td>${result.article_set[i].noticeboard_name}</td>
                                            <td>${result.article_set[i].title}</td>
                                            <td>${result.article_set[i].created_date.slice(0, 10)}</td>
                                            <td>${result.article_set[i].count}</td>
                                            <td>
                                                <button id="article_update_${result.article_set[i].id}">글 수정하기</button>
                                            </td>
                                            <td>
                                                <button id="article_delete_${result.article_set[i].id}">글 삭제하기</button>
                                            </td>
                                            `
            written_article.append(written_article_info)
            }
        
        const written_comment = document.getElementById("mypage_written_comment")
        for (i=0; i<result.comment_set.length; i++) {
            let written_comment_info = document.createElement('tr')
            written_comment_info.innerHTML = `
                                            <td>${result.comment_set[i].community_name}</td>
                                            <td>${result.comment_set[i].noticeboard_name}</td>
                                            <td>${result.comment_set[i].content}</td>
                                            <td>${result.comment_set[i].created_date.slice(0, 10)}</td>
                                            <td>
                                                <button id="comment_update_${result.comment_set[i].id}">댓글 수정하기</button>
                                            </td>
                                            <td>
                                                <button id="comment_delete_${result.comment_set[i].id}">댓글 삭제하기</button>
                                            </td>
                                            `
            written_comment.append(written_comment_info)
            }

        const request_signin = document.getElementById("request_signin_table")
        for (i=0; i<result.userandcommunityinvitation_set.length; i++) {
            if (result.userandcommunityinvitation_set[i].invited === true) {
                let request_signin_info = document.createElement('tr')
                request_signin_info.innerHTML = `
                                                <td>${result.userandcommunityinvitation_set[i].community_name}</td>
                                                <td>${result.userandcommunityinvitation_set[i].date.slice(0, 10)}</td>
                                                <td>
                                                    <button id="request_signin_${result.userandcommunityinvitation_set[i].id}" onclick="delete_request_signin(this.id)">신청 취소</button>
                                                </td>
                                                `
                request_signin.append(request_signin_info)
                }
            }
        }
    )
}


async function if_logout() {
    let make_community_btn = document.getElementById("make_community");
    let show_joined_community = document.getElementById("by_joined");
    make_community_btn.remove();
    show_joined_community.remove();
}

async function if_login() {
    let nav_bar_login = document.getElementById('nav_login_btn');
    let nav_bar_logout = document.getElementById('nav_logout_btn');
    nav_bar_login.setAttribute("style", "display:none");
    nav_bar_logout.setAttribute("style", "display:flex");
};

window.onload = ()=> {try {
    const payload = JSON.parse(localStorage.getItem("payload"));
    // 아직 access 토큰의 인가 유효시간이 남은 경우
    if (payload.exp > (Date.now() / 1000)){
        if_login();
        get_mypage_details();
    } else {
        // 인증 시간이 지났기 때문에 다시 refreshToken으로 다시 요청을 해야 한다.
        const requestRefreshToken = async (url) => {
              const response = await fetch(url, {
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  method: "POST",
                  body: JSON.stringify({
                      "refresh": localStorage.getItem("refresh")
                  })}
              );
              return response.json();
        };

        // 다시 인증 받은 accessToken을 localStorage에 저장하자.
        requestRefreshToken("http://127.0.0.1:8000/user/refresh/").then((data)=>{
            // 새롭게 발급 받은 accessToken을 localStorage에 저장
            const accessToken = data.access;
            localStorage.setItem("access", accessToken);
            if_login();
            get_mypage_details();
        });
    }
} catch (error) {
    if_logout();
    };
}