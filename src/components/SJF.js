let SjfSolver = (AT=[],BT=[]) => {

    // AT = [1, 3, 6, 7, 9];
    // BT = [7, 3, 2, 10, 8];

    // info is a array of dictionary
    let info = [];

    // insert the value into info array
    for (let i = 0; i < AT.length; i++) {
        info.push({ "index": i, "AT": AT[i], "BT": BT[i] })
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

        // if we have process in array take process which have less burst time and execute the process 
        // and push the process data into chart array and remove from info array 
        if (curr.length !== 0) {

            t = t + curr[0].BT;
            curr[0]["CT"] = t
            chart.push(curr[0]);
            info.forEach((ele, i) => {
                if (ele.index === curr[0].index)
                    info.splice(i, 1)

            })
            curr.shift()
        }
        // if there is no process in the array increase the time +1
        else {
            t++;
        }

    }

    // calculate average Tat and average Wat and update the value in chart array
    let avgTat=0,avgWat=0
    chart.forEach((ele, i) => {
        chart[i]['TAT'] = Math.abs(ele.CT - ele.AT)
        chart[i]['WAT'] = Math.abs(ele.TAT - ele.BT)
        avgTat+=chart[i]['TAT']
        avgWat+=chart[i]['WAT']
    })
    avgTat=avgTat/chart.length
    avgWat=avgWat/chart.length

    // return the chart array , avgTat , avgWat
    return {chart,avgTat,avgWat}
}


export default SjfSolver;