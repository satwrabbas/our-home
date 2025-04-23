//C:\Users\Abbas Satwr\Desktop\مشاريعي\عقاري\login\login.js
login
// تفعيل التحقق من الحقول عند الإرسال
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // منع إرسال النموذج تلقائيًا

    // الحصول على قيم الحقول
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    // إعادة تعيين رسائل الخطأ
    email.classList.remove('is-invalid');
    password.classList.remove('is-invalid');

    // التحقق من البريد الإلكتروني
    if (!validateEmail(email.value)) {
        email.classList.add('is-invalid');
        email.nextElementSibling.style.display = 'block';
        return;
    }

    // التحقق من كلمة المرور
    if (password.value.length < 6) {
        password.classList.add('is-invalid');
        password.nextElementSibling.style.display = 'block';
        return;
    }

    // إذا كانت جميع الحقول صحيحة
    alert('تم تسجيل الدخول بنجاح!');
    window.location.href = 'dashboard.html'; // الانتقال إلى لوحة التحكم
});

// دالة للتحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}