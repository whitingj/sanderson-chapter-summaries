// ==UserScript==
// @name         sanderson-coppermind-chapter-clean-chapter-summaries
// @namespace    http://tampermonkey.net/
// @version      2024-12-04
// @description  try to take over the world!
// @author       You
// @match        https://coppermind.net/wiki/Summary*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=coppermind.net
// @grant        none
// ==/UserScript==

setTimeout(function() {
    console.log("Making chapter summaries great for screen reading.")
    $('h1')[0].insertAdjacentText("afterend", "Modified for screen reading, only plot summaries are present");
    let times = $('dl i');
    times.each((i, e) => {
        let pn = e.parentNode.parentNode;
        if (e.innerText.includes('ago')) {
            pn.insertAdjacentElement("afterend", e);
        }
    });
    $('#toc').remove();
    $('#summary-spoiler-notice')[0].parentNode.remove();
    $('blockquote').remove();
    $('dl').remove();
    $('ul').remove();
    $('img').remove();
    $('.lazy-image-placeholder').remove();

    //check to see if we have collapsed blocks and expand them all
    if ($('section').length > 0) {
        //the page added sections and collapsed them all
        let sections = $('section');
        let h2 = $('h2');
        sections.each((i, e) => {
            e.classList.add('open-block')
        });
        h2.each((i, e) => {
            e.classList.add('open-block')
        });
    }

    //add an article tag
    let main = $('main')[0] || $('.mw-body')[0];
    if (main) {
        $(main).wrapInner('<article></article>');
    } else {
        console.log('Unable to find main');
    }

}, 100);