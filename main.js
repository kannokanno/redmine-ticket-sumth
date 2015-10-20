function sumth_run() {
    var statuses = ["新規/NEW", "進行中/Progress", "フィードバック/Feed back", "解決/Solved", "終了/Finish"];
    var tickets  = $('#content .issues tbody .issue');
    var summary  = statuses.map(function(status) {
        var status_ticket = tickets.filter(function(i, e){ return $(e).find(".status").text() === status }).toArray();
        var total = 0;
        var data = status_ticket.reduce(function(memo, e) {
            var row        = $(e);
            var assigned   = row.find("td.assigned_to").text() || 'anonymous';
            var estimated  = (row.find("td.estimated_hours").text() || 0) - 0;
            memo[assigned] = (memo[assigned] || 0) + estimated;
            total          = total + estimated;
            return memo;
        }, {});

        var detail = [{ name: 'TOTAL', done: total }];
        for (name in data) {
            detail.push({ name: name, done: data[name] });
        }

        return { status: status, items: detail };
    });

    var all_total = summary.reduce(function(sum, data) {
        var total_score = data.items.filter(function(item){ return item.name === "TOTAL" });
        return sum + total_score[0].done;
    }, 0);

    summary.push({ status: "全ステータス", items: [{ name: "TOTAL", done: all_total }] });

    summary.forEach(function(item) {
        console.log('%c' + item.status, 'color: blue; font-size: 13px;');
        console.table(item.items);
    });
}
