let SjrfSolver = (AT = [], BT = []) => {
    // AT = [2, 5, 1, 0, 4];
    // BT = [6, 2, 8, 3, 4];
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

            let CDetail = {}
            info.forEach((ele, i) => {

                if (ele.index === curr[0].index) {
                    CDetail = { i, Bt: ele.BT }
                }

            })

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
            else {
                t = t + 1;
                info[CDetail.i].BT--;
            }

            // curr.shift()
        }
        else {
            // console.log(curr)
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
    chart.sort((a, b) => a.index - b.index)
    return {chart,avgTat,avgWat}
}

export default SjrfSolver;