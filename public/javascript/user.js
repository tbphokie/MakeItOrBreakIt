$(document).ready(function () {

    $(document).on("click", ".complete-button", completeHabit)
    var d = new Date();

    function completeHabit(event) {
        habitId = event.target.id
        console.log(habitId)
        updateProgress(
            {
                date: d,
                HabitId: habitId
            }
        )
    }

    function updateProgress(progressData) {

        $.post("/api/completehabit/:id", progressData, function () {

            location.reload()
        })
    }

});