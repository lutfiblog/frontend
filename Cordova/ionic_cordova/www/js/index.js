const courseName = document.querySelector('#course_name');
const coursePrice = document.querySelector('#course_price');
const btnClear = document.querySelector('#btn_clear');
const btnAdd = document.querySelector('#btn_add');
const courseList = document.querySelector('#course_list');
const overalExpense = document.querySelector('#overal_expense');

let totalExpense = 0;

const clear = () => {
    courseName.value = '';
    coursePrice.value = '';
}

const addCourse = () => {
    //validation
    if (
        courseName.value.trim().length == 0 ||
        coursePrice.value.trim().length == 0 ||
        coursePrice.value <= 0) {
            return showAlert();
        }
//adding course
    const item = document.createElement('ion-item');
    item.textContent = courseName.value + ': Rp' + coursePrice.value;
    courseList.appendChild(item);

        // calculating 
    totalExpense += +coursePrice.value;
    overalExpense.textContent = 'Rp' + totalExpense;

    clear();
}

const showAlert = () => {
    const alert = document.createElement('ion-alert');
    alert.header = 'Incorect data!';
    alert.message = 'please, make sure input right data';
    alert.buttons = ['Okay'];

    document.body.appendChild(alert);
    return alert.present();
}

//event
btnClear.addEventListener('click', clear);
btnAdd.addEventListener('click', addCourse);