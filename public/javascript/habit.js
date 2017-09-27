$(document).ready(function () {
    var habitInput = $("#new-habit-name")

    var url = window.location.href
    var userIdArray = url.split("=")
    var userId = userIdArray[1]
    console.log(url)
    console.log(userId)
    // var userId = sessionStorage.getItem("user-id")

    $(document).on("click", "#submit", handleHabitFormSubmit)


    function handleHabitFormSubmit(event) {
        event.preventDefault();
        console.log(event)
        console.log(habitInput)
        console.log(userId)

        var selValue = $('input[name=radioGroup]:checked').val();

        if (!habitInput.val().trim()) {
            return;
        }
        upsertHabit(
            {
                name: habitInput
                    .val()
                    .trim(),
                make: selValue,
                UserId: userId
            },
        );
    }

    function upsertHabit(habitData) {
        $.post("/api/createhabit", habitData)
    }
})