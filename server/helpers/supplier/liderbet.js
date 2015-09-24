/**
 * Created by gigac on 9/18/2015.
 */
/**
 * Created by gigac on 9/18/2015.
 */
var core = require('../helpers/core.js');
var logger = require('../helpers/logger.js');
var async = require('async');
var request = require('request');
var cheerio = require('cheerio');

var URLS_Liderbet = [
    {
        url: 'https://www.lider-bet.com/web/ka/sport#saved=16.-2428.-6143,16.-2928.-7852,16.-2928.-7574,16.-2138.-5196,16.-2203.-13408,16.-3543.-10300,16.-2204.-5297,16.-2166.-7110,16.-2166.-7537,16.-2166.-5254,16.-2432.-5852,16.-2432.-12767,16.-2287.-6656,16.-3035.-7433,16.-2139.-5197,16.-2424.-5898,16.-2733.-6961,16.-2714.-12288,16.-3058.-8165,16.-3058.-7548,16.-2143.-12287,16.-2145.-5203,16.-2283.-13008,16.-2201.-11806,16.-2142.-11947,16.-2644.-11815,16.-2814.-11639,16.-2925.-12640,16.-2169.-7576,16.-2169.-7521,16.-3487.-10077,16.-2170.-5606,16.-2170.-13630,16.-2170.-12094,16.-2167.-11998,16.-2167.-11936,16.-2134.-10250,16.-2134.-9920,16.-2134.-5193,16.-2123.-7001,16.-2123.-6982,16.-2123.-5182,16.-3052.-8627,16.-3052.-7496,16.-2552.-5971,16.-2282.-5599,16.-3036.-12591,16.-3036.-12623,16.-3040.-7455,16.-3128.-8363,16.-2645.-7817,16.-2645.-7582,16.-2717.-7800,16.-3028.-7401,16.-2140.-5198,16.-2171.-9911,16.-2171.-5255,16.-2281.-5762,16.-2618.-10023,16.-2618.-8358,16.-3033.-7427,16.-3003.-7311,16.-2136.-5194,16.-2200.-7606,16.-2200.-7204,16.-2929.-11940,16.-2146.-5845,16.-2146.-5204,16.-2983.-7197,16.-2922.-9890,16.-2092.-5144,16.-2091.-8241,16.-2091.-5143,16.-2088.-5138,16.-2087.-12122,16.-2087.-8608,16.-2087.-5135,16.-2087.-5134,16.-3019.-9296,16.-3019.-7371,16.-2086.-7160,16.-2086.-5133,16.-2086.-5132,16.-2720.-6958,16.-2720.-10019,16.-2720.-10018,16.-2720.-10017,16.-2720.-10016,16.-2720.-9703,16.-2720.-8360,16.-2974.-9901,16.-2974.-10011,16.-2974.-9899,16.-2974.-9941,16.-2974.-9898,16.-2974.-10010,16.-2974.-9942,16.-2974.-9943,16.-2974.-8359,16.-2974.-7337,16.-3297.-9892,16.-3297.-10004,16.-3297.-10003,16.-3297.-10002,16.-3297.-10001,16.-3297.-8491,16.-3297.-8490,16.-2085.-9687,16.-2085.-5131,16.-2085.-5130,16.-2918.-7703,16.-2918.-7567,16.-2918.-7501,16.-2331.-12203,16.-2331.-11809,16.-2331.-11808,16.-2331.-11807,16.-2331.-5689,16.-2084.-10194,16.-2084.-10193,16.-2084.-8612,16.-2084.-5136,16.-2084.-5129,16.-2083.-10414,16.-2083.-5128,16.-2095.-5148,16.-2280.-12608,16.-2280.-5760,16.-2292.-7575,16.-2292.-10247,16.-2292.-9255,16.-2292.-8183,16.-2292.-7794,16.-2292.-5569,16.-2097.-12642,16.-2097.-12643,16.-2097.-5155,16.-2097.-5156,16.-2149.-5215,16.-2149.-5214,16.-2202.-5761,16.-2202.-5616,16.-2081.-5604,16.-2081.-5124,16.-2081.-5122,16.-2461.-5935,16.-2461.-5936,16.-2461.-5937,16.-2461.-5938,16.-2461.-5939,16.-2461.-5894,16.-2147.-5151,16.-2147.-5150,16.-2147.-5149,16.-2147.-5206,16.-2147.-5205,16.-2082.-12624,16.-2082.-12625,16.-2082.-12644,16.-2082.-12631,16.-2082.-11952,16.-2082.-11953,16.-2082.-10606,16.-2082.-12621,16.-2082.-12467,16.-2082.-10605,16.-2082.-12275,16.-2082.-12324,16.-2082.-10642,16.-2082.-10641,16.-2082.-10497,16.-2082.-10496,16.-2082.-5216,16.-2082.-5217,16.-2082.-5218,16.-2082.-5219,16.-2082.-5220,16.-2082.-5207,16.-2082.-5126,16.-2082.-5125,16.-2080.-11651,16.-2080.-5687,16.-2080.-5213,16.-2080.-5212,16.-2080.-5211,16.-2080.-5247,16.-2080.-5590,16.-2080.-5153,16.-2080.-5141,16.-2080.-5137,16.-2080.-5123,16.-2080.-5121,16.-2098.-13047,16.-2195.-10457,16.-2195.-10456,16.-2195.-10455,16.-2195.-10454,16.-2195.-10453,16.-2195.-10452,16.-2195.-10451,16.-2195.-10450,16.-2195.-10449',
        tags: ['lider-bet'],
        cookie : 'Language=en_US;UI_Language=en-US'
    }];

var spider_Lidetbet = {
    urls: URLS_Liderbet,
    processBody: function (body) {
        var $ = cheerio.load(body);
        return $('.match-list');
    },
    processItem: function (html, url, tags) {

        try {
            var $ = cheerio.load(html);


            var date = $('#betDateText').text();
            var time = $('#betHourText').text();

            var teams = $('#categoryText').text().trim();
            var index = teams.indexOf('-');
            var Team1 = teams.substring(0, index - 1).trim();
            var Team2 = teams.substring(index + 1, teams.length).trim();

            var bet1 = $('td.category_outcome p.eoo_p')[0].children[0].data;
            var betX = $('td.category_outcome p.eoo_p')[1].children[0].data;
            var bet2 = $('td.category_outcome p.eoo_p')[2].children[0].data;

            if (date === "" ||
                time === "" ||
                bet1 === "" ||
                betX === "" ||
                bet2 === "") {
                return {};
            }


            var year = "20" + date.substring(6, 8);
            var month = date.substring(3, 5);
            var day = date.substring(0, 2);
            var hours = time.substring(0, 2);
            var minutes = time.substring(3, 5);
            var dt = new Date(year, month - 1, day, hours, minutes, 0, 0);
            return {
                betType: "football",
                bet1: bet1,
                betX: betX,
                bet2: bet2,
                player1: Team1,
                player2: Team2,
                date: dt,
                betSupplier: "europeBet",
                webSite: 'https://sport.europe-bet.com'
            }

        }
        catch (e) {
            console.log("entering catch block");
            console.log(e);
            console.log("leaving catch block");
            return {};
        };
    },
    finish: function () {
        console.log('Finished');
    }

};

module.exports.run = function (finish) {
    core.run(spider_Lidetbet, function(){
        finish();
    });
};
