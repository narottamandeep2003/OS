let SjfSolver = (AT=[],BT=[]) => {
    // let AT = [1, 3, 6, 7, 9];
    // let BT = [7, 3, 2, 10, 8];
    let info = [];

    for (let i = 0; i < AT.length; i++) {

        info.push({ "index": i, "AT": AT[i], "BT": BT[i] })

    }

    info.sort((a, b) => a.AT - b.AT)
    let chart = []
    let t = 0
    while (info.length !== 0) {
        let curr = []

        info.forEach((e) => {

            if (e.AT <= t) {
                curr.push(e)
            }


        })


        curr.sort((a, b) => a.BT - b.BT)

        // console.log("a",curr)

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
        else {
            t++;
        }

    }
    let avgTat=0,avgWat=0
    chart.forEach((ele, i) => {
        chart[i]['TAT'] = Math.abs(ele.CT - ele.AT)
        chart[i]['WAT'] = Math.abs(ele.TAT - ele.BT)
        avgTat+=chart[i]['TAT']
        avgWat+=chart[i]['WAT']
    })
    avgTat=avgTat/chart.length
    avgWat=avgWat/chart.length
    return {chart,avgTat,avgWat}
}

export default SjfSolver;