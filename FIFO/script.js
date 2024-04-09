let pageFaults, pageHits, pageReferences=0;
function fifoPageReplacement(pages, capacity) {
    pageFaults = 0;
    let pageFrame = [];
    let output1 = "";
    for (let i = 0; i < pages.length; i++) {
        let pageIndex = pageFrame.indexOf(pages[i]);
        if (pageIndex === -1) {        
            pageFaults++;
            if (pageFrame.length < capacity) {

                pageFrame.push(pages[i]);
                output1 += `<p class="miss">Page ${pages[i]} loaded into frame: [${pageFrame.join(", ")}] : Miss</p>`;
            } 
            else {
                let firstPage = pageFrame.shift();
                pageFrame.push(pages[i]);
                output1 += `<p class="miss">Page ${firstPage} replaced with page ${pages[i]}</p>`;
            }          
        }        
        else {
            output1 += `<p class="hit">Page ${pages[i]} already in frame: [${pageFrame.join(", ")}] : Hit</p>`;
        }
    }
    pageHits = pages.length - pageFaults;
    output1 += `<p>The total references are: ${pages.length}`;
    output1 += `<p class="miss">Total page misses: ${pageFaults}</p>`;
    output1 += `<p class="hit">Total page hits: ${pageHits}</p>`;
    output1 += `<p>Final page frames: [${pageFrame.join(", ")}]</p>`;

    return output1;
}
function runSimulation() {

    let numFrames = document.getElementById("num-frames").value;
    pageReferences = document.getElementById("page-references").value.split(",");

    if (numFrames <= 0) {
        alert("Number of frames must be greater than 0");
        return;
    }   
    for (var i = 0; i < pageReferences.length; i++) {
        pageReferences[i] = parseInt(pageReferences[i]);
    }
    
    document.getElementById("output0.0").innerHTML = "The frame size fixed by the user is: " + numFrames;
    document.getElementById("output0").innerHTML = "The reference array entered by the user is: " + pageReferences;
    let output1Div = document.getElementById("output1");
    output1Div.innerHTML = fifoPageReplacement(pageReferences, numFrames);
}
function calculateRatio() {

    console.log("The number of hits is: " +pageHits);
    console.log("The number of misses is: " +pageFaults);
    console.log("The toatal refences are: " +pageReferences.length);

    let a1 = parseInt(pageHits)/parseInt(pageReferences.length);
    let a2 = 100;
    let hit_ratio = (parseFloat(a1)*parseInt(a2)).toFixed(2);
    console.log("The Hit Ratio is: " +hit_ratio +"%");
    let miss_ratio = (parseInt(a2) - parseFloat(hit_ratio)).toFixed(2);
    console.log("The Miss Ratio is: " +miss_ratio +"%");
    document.getElementById("output2").innerHTML = "The Hit Ratio is: " +hit_ratio +"%";
    document.getElementById("output3").innerHTML = "The Miss ratio is: " +miss_ratio +"%";
}

function Reset(){
    location.reload();
}