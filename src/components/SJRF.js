let SjrfSolver = (AT = [], BT = []) => {
    // AT = [2, 5, 1, 0, 4];
    // BT = [6, 2, 8, 3, 4];
    // info is a array of dictionary
    let info = [];
    // insert the value into info array
    for (let i = 0; i < AT.length; i++) {

        info.push({ "index": i, "AT": AT[i], "BT": BT[i], "RT": -1 })


    }
    // sort the arr according to arrival time
    info.sort((a, b) => a.AT - b.AT)

    // chart is output array
    let chart = []
    let t = 0


    while (info.length !== 0) {
        let curr = []
        // collect all the processes till current time
        info.forEach((e) => {

            if (e.AT <= t) {
                curr.push(e)
            }


        })

        // sort the array according to burst time
        curr.sort((a, b) => a.BT - b.BT)

        // if we have process in array take process which have less burst time and execute the process one unit time
        // and push the process data into chart array and remove from info array 
        if (curr.length !== 0) {

            let CDetail = {}
            info.forEach((ele, i) => {

                if (ele.index === curr[0].index) {
                    CDetail = { i, Bt: ele.BT }
                }

            })

            if (curr[0].RT == -1) {
                curr[0].RT = Math.abs(curr[0].AT - t);
            }

            // update the data of process into chart array if burst time is equals to 1 unit left
            if (CDetail.Bt === 1) {
                chart.push(curr[0]);
                t = t + 1;
                curr[0]["CT"] = t
                curr[0]["BT"] = BT[curr[0].index];
                info.forEach((ele, i) => {

                    if (ele.index === curr[0].index)
                        info.splice(i, 1)

                })
            }
            // execute the process one unit time
            else {
                t = t + 1;
                info[CDetail.i].BT--;
            }
        }
        //  if there is no process in the array increase the time +1
        else {
            t++;
        }

    }

    // calculate average Tat and average Wat and update the value in chart array
    let avgTat = 0, avgWat = 0, avgRt = 0
    chart.forEach((ele, i) => {
        chart[i]['TAT'] = Math.abs(ele.CT - ele.AT)
        chart[i]['WAT'] = Math.abs(ele.TAT - ele.BT)
        avgTat += chart[i]['TAT']
        avgWat += chart[i]['WAT']
        avgRt += chart[i]['RT']
    })
    avgTat = avgTat / chart.length
    avgWat = avgWat / chart.length
    avgRt=avgRt/chart.length
    
    chart.sort((a, b) => a.index - b.index)

    // return the chart array , avgTat , avgWat,avgRt
    return { chart, avgTat, avgWat,avgRt }
}

export default SjrfSolver;