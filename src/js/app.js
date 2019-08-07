'use strict';


// ----------------------------- open/close hamburger menu

var hamburger = function () {
    var btn = document.getElementById('btn-nav'),
        menuBtn = document.getElementById('menu-btn'),
        menu = document.getElementById('hamburger-js');

    btn.onclick = function (e) {
        e.preventDefault();
        var menuClass = document.getElementById('menu-btn').className;

        if (menuClass.indexOf('active') < 0) {
            menuBtn.classList.add('active');
            menu.classList.add('active');
        } else {
            menuBtn.classList.remove('active');
            menu.classList.remove('active');
        }
    }
};

// ----------------------------- arrow-down-scroll

var scroll = function (arrow) {
    var sectionToScroll = document.getElementById('js-section-2');

    arrow.onclick = function () {
        var distanceToTop = sectionToScroll.offsetTop;
        window.scrollTo({
            top: distanceToTop,
            behavior: "smooth"
        });
        return false;
    }
};

// ----------------------------- coorcect phone

var genPhone = function (phone) {
    var nums = ['1','2','3','4','5','6','7','8','9','0','+',' ','-'];

    phone.onkeyup = function (e) {
        var val = e.target.value;
        var key = e.keyCode || e.charCode;

        if(key == 8 || key == 46)
            return false;
        
        if(val[1] != 3) {
            e.target.value = genPhone(val);
        }
    };

    function genPhone(phoneValue) {
        var newPhone = phoneValue.split('');
        
        for (let i = 0; i < newPhone.length; i++) {
            if (nums.indexOf(newPhone[i]) < 0) {
                return newPhone.join('').substring(0,newPhone.length-1);
            }
        }
        if (newPhone[0] === '8') {
            newPhone.splice(0,1,'+','7');
        }
        if (newPhone[1] === '8') {
            newPhone.splice(1,1,'7');
        }
        if (newPhone.length >= 2 && newPhone[2] != ' ') {
            newPhone.splice(2, 0, ' ');
        }
        if (newPhone.length >= 6 && newPhone[6] != ' ') {
            newPhone.splice(6, 0, ' ');
        }
        if (newPhone.length >= 10 && newPhone[10] != '-') {
            newPhone.splice(10, 0, '-');
        }
        if (newPhone.length >= 13 && newPhone[13] != '-') {
            newPhone.splice(13, 0, '-');
        }
        if (newPhone.length > 16) {
            return newPhone.join('').substring(0,16);
        }
        return newPhone.join('');
    }
};

// ----------------------------- Loads on entry


var genMenu = function (nav, direction) {
    nav.onclick = function (e) {
        e.preventDefault();
        var target = e.target,
            content = document.getElementById('content'),
            container = document.getElementById('container'),
            xhr;

        if (direction) {
            while (target.tagName != 'A') {
                target = target.parentNode;
            }
        } else {
            while (target.tagName != 'A') {
                target = target.firstChild;
            }
        }

        container.parentNode.removeChild(container);

        xhr = new XMLHttpRequest();
        xhr.open('GET', target.href, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                content.innerHTML = xhr.responseText;
                var second = document.getElementById('second-container');
                if (second) {
                    genMenu(second, true);
                }
            }
        }
        xhr.send();
        // JSON.parse(xhr.responseText)
        // $('#content').load(url + ' #container').hide().fadeIn('slow');
    };
};


// ----------------------------- ACTION

(function () {
    var arrow = document.getElementById('js-arrow-down');
    var phone = document.getElementById('phone-input-id');
    var nav = document.getElementById('js-entry-nav');

    if (document.getElementById('btn-nav')) {
        hamburger();
    }
    
    if (arrow) {
        scroll(arrow);
    }

    if (phone) {
        genPhone(phone);
    }

    if (nav) {
        genMenu(nav)
    }
})();