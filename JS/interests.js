document.addEventListener("DOMContentLoaded", function () {
    let timeInterval;
    let isClockRunning = false;

    const endDateInput = document.getElementById('endDate');
    const clockContainer = document.querySelector('.clock');

    const savedEndDate = localStorage.getItem('countdownEndDate');

    if (savedEndDate) {
        endDateInput.value = savedEndDate;
        startClock(savedEndDate);
    }

    endDateInput.addEventListener('change', function () {
        if (isClockRunning) {
            clearInterval(timeInterval);
            isClockRunning = false;
        }
        const newEndDate = endDateInput.value;
        localStorage.setItem('countdownEndDate', newEndDate);
        startClock(newEndDate);
    });

    function startClock(endDate) {
        updateClock(endDate);
        timeInterval = setInterval(function () {
            updateClock(endDate);
        }, 1000);
        isClockRunning = true;
    }

    function updateClock(endDate) {
        const timeLeft = getTimeLeft(endDate);

        if (timeLeft.total <= 0) {
            clearInterval(timeInterval);
            isClockRunning = false;
        }

        const elements = ['days', 'hours', 'minutes', 'seconds'];
        for (const unit of elements) {
            const element = document.querySelector(`.${unit}`);
            if (element) {
                element.textContent = timeLeft[unit];
            }
        }
    }

    function getTimeLeft(endDate) {
        const now = new Date();
        const targetDate = new Date(endDate);
        const totalMilliseconds = Date.parse(targetDate) - now;
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const totalHours = Math.floor(totalMinutes / 60);
        const hours = totalHours % 24;
        const days = Math.floor(totalHours / 24);

        return {
            total: totalMilliseconds,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }
});