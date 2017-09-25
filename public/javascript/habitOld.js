$(document).ready(function () {
    var habitInput = $(".new-habit-name")

    var url = window.location.href
    var userIdArray = url.split("=")
    var userId = userIdArray[1]
    console.log(url)
    console.log(userId)
    // var userId = sessionStorage.getItem("user-id")

    $(document).on("click", "#submit", handleHabitFormSubmit)


    function handleHabitFormSubmit(event) {
        event.preventDefault();
        var bMake = this.value;
        var iMake = 3;


        if (bMake === 'good') {
            habitInput = $("#entergoodHabit").val();
            console.log("setting good");
            iMake = 1;
        } else {
            habitInput = $("#enterbadHabit").val();
            console.log("setting bad");
            iMake = 0;
        }
        if (!habitInput.trim()) {
            console.log("empty string");
            return;
        }

        console.log(bMake);
        console.log(userId)
        console.log(habitInput);

        upsertHabit(
            {
                name: habitInput,
                make: iMake,
                UserId: userId
            },
        );
    }

    function upsertHabit(habitData) {
        $.post("/api/createhabit", habitData)
    }
})