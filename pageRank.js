
const pageRank = (webPages, hiperlinks) => {
    
    const dampingFactor = 0.85;
    let pageRankScore = [];

    let incomingLinks = [];
    let outgoingLinks = [];

    for(let i=0; i<webPages.length; i++){
        //set initial scores
        pageRankScore[i] = 1/webPages.length;
        
        let countOutging = 0;
        incomingLinks[i] = [];
        for(let [from, to] of hiperlinks){
            //get incoming link for each page          
            if(to === i){
                incomingLinks[i].push(from);
                console.log(from);
            }
            //get outgoing link for each page
            if(from === i){
                countOutging++;
            }
        }
        outgoingLinks[i] = countOutging;
    }

    //console.log(outgoingLinks);

    //loops through a defined amount of time to ensure convergence and stable rank scores: chose 100 
    let loop=0;
    while(loop < 100){

        //set new rank score
        let rankScore = [];

        /**
         * loops through all pages to calc each rank
         * using the formular pr = (1-dampingFactor)/n + d * [(pr(t1)/c(t1))+...+(pr(tn)/c(tn))]
         * where n = number of pages
         * c = number of links
         */
        for(let i=0; i<webPages.length; i++){
            let sumOfRankScore = 0;

            //looping through the incoming links of current page to calc for [(pr(t1)/c(t1))+...+(pr(tn)/c(tn))] as sum
            for(let j=0; j<incomingLinks[i].length; j++){
                //console.log(incomingLinks[i][j]+ " " + pageRankScore[incomingLinks[i][j]] + " " + outgoingLinks[incomingLinks[i][j]]);
                sumOfRankScore += pageRankScore[incomingLinks[i][j]] / outgoingLinks[incomingLinks[i][j]];
                console.log(sumOfRankScore)
            }

            // calculating pr = (1-dampingFactor)/n + d * sum
            rankScore[i] = (1-dampingFactor) / webPages.length + dampingFactor * sumOfRankScore;
        }
        pageRankScore = rankScore;
        
        loop++;
    }


    return pageRankScore;
}

const webPages = ['A', 'B', 'C', 'D'];
const links = [[0, 1], [1, 2], [2, 0], [2, 3], [3, 2]];

console.log(pageRank(webPages, links));
