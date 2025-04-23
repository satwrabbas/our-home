// C:\Users\Abbas Satwr\Desktop\مشاريعي\عقاري\add_property_agent\add_property_agent.js
document.addEventListener("DOMContentLoaded", function() {
    // معالجة إضافة العقار
    document.getElementById('propertyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        Swal.fire({
            title: 'تمت الإضافة!',
            text: 'تمت إضافة العقار بنجاح',
            icon: 'success',
            confirmButtonText: 'تم'
        }).then(() => {
            this.reset();
        });
    });

    // معالجة إضافة الوكيل
    document.getElementById('agentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        Swal.fire({
            title: 'تمت الإضافة!',
            text: 'تمت إضافة الوكيل بنجاح',
            icon: 'success',
            confirmButtonText: 'تم'
        }).then(() => {
            this.reset();
        });
    });

    // إدارة حالة النافبار في الجوال
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector("#mainNav");
    
    navbarToggler.addEventListener("click", () => {
        navbarCollapse.classList.toggle("show");
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // معالجة إضافة العقار
    document.getElementById('propertyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // جمع بيانات العقار
        const propertyData = {
            type: this.querySelector('select').value,
            location: this.querySelector('input[type="text"]').value,
            price: this.querySelector('input[type="number"]:nth-of-type(1)').value,
            area: this.querySelector('input[type="number"]:nth-of-type(2)').value,
            rooms: this.querySelector('input[type="number"]:nth-of-type(3)').value,
            bathrooms: this.querySelector('input[type="number"]:nth-of-type(4)').value,
        };

        // حفظ البيانات في LocalStorage
        let properties = JSON.parse(localStorage.getItem('properties')) || [];
        properties.push(propertyData);
        localStorage.setItem('properties', JSON.stringify(properties));

        Swal.fire({
            title: 'تمت الإضافة!',
            text: 'تمت إضافة العقار بنجاح',
            icon: 'success',
            confirmButtonText: 'تم'
        }).then(() => {
            this.reset();
            window.location.href = '../../properties/properties.html'; // الانتقال للصفحة الثانية
        });
    });

    // معالجة إضافة الوكيل (نفس المنطق)
    document.getElementById('agentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const agentData = {
            name: this.querySelector('input[type="text"]').value,
            rating: this.querySelector('select').value,
            phone: this.querySelector('input[type="tel"]').value,
        };

        let agents = JSON.parse(localStorage.getItem('agents')) || [];
        agents.push(agentData);
        localStorage.setItem('agents', JSON.stringify(agents));

        Swal.fire({
            title: 'تمت الإضافة!',
            text: 'تمت إضافة الوكيل بنجاح',
            icon: 'success',
            confirmButtonText: 'تم'
        }).then(() => {
            this.reset();
            window.location.href = '../../agents/agents.html'; 
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // عرض العقارات المضافة من LocalStorage
    const displayProperties = () => {
        const propertiesList = document.getElementById("propertiesList");
        const storedProperties = JSON.parse(localStorage.getItem("properties")) || [];

        // مسح المحتوى القديم (إن وجد)
        propertiesList.innerHTML = "";

        // إضافة العقارات الجديدة
        storedProperties.forEach((property, index) => {
            const propertyHTML = `
                <div class="col-md-4 animate-fade">
                    <div class="property-card">
                        <div class="position-relative">
                            <img src="property-placeholder.jpg" class="property-image w-100" alt="${property.type}">
                            <div class="property-badge">عرض خاص</div>
                        </div>
                        <div class="p-3">
                            <h4 class="text-primary">${property.type} في ${property.location}</h4>
                            <div class="d-flex justify-content-between mb-3">
                                <p class="text-muted"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                                <p class="text-primary fw-bold">${property.price} ر.س</p>
                            </div>
                            <div class="row g-2 mb-3">
                                <div class="col-4">
                                    <div class="bg-light p-2 text-center rounded">
                                        <small class="d-block">المساحة</small>
                                        <strong>${property.area}م²</strong>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="bg-light p-2 text-center rounded">
                                        <small class="d-block">الغرف</small>
                                        <strong>${property.rooms}</strong>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="bg-light p-2 text-center rounded">
                                        <small class="d-block">الحمامات</small>
                                        <strong>${property.bathrooms}</strong>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-primary w-100" onclick="showPropertyDetails(${index})">تفاصيل العقار</button>
                        </div>
                    </div>
                </div>
            `;
            propertiesList.insertAdjacentHTML("beforeend", propertyHTML);
        });
    };

    // عرض العقارات عند تحميل الصفحة
    displayProperties();

    // تحديث القائمة عند إضافة عقار جديد (اختياري)
    window.addEventListener("storage", () => {
        displayProperties();
    });

    // بقية الوظائف (التنقل، الفلترة، إلخ...)
    // ...
});

// وظيفة عرض تفاصيل العقار
function showPropertyDetails(index) {
    const properties = JSON.parse(localStorage.getItem("properties")) || [];
    const property = properties[index];

    Swal.fire({
        title: "تفاصيل العقار",
        html: `
            <p><strong>النوع:</strong> ${property.type}</p>
            <p><strong>الموقع:</strong> ${property.location}</p>
            <p><strong>السعر:</strong> ${property.price} ر.س</p>
            <p><strong>المساحة:</strong> ${property.area}م²</p>
            <p><strong>الغرف:</strong> ${property.rooms}</p>
            <p><strong>الحمامات:</strong> ${property.bathrooms}</p>
        `,
        icon: "info",
        confirmButtonText: "حسنًا",
    });
}
