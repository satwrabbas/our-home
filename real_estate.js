// C:\Users\Abbas Satwr\Desktop\مشاريعي\عقاري\real_estate.js
import { supabase } from './supabase-config.js';

// تعديل الدوال لاستخدام async/await بشكل صحيح
async function fetchProperties() {
    try {
        const { data: properties, error } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false }); // ترتيب العقارات حسب التاريخ

        if (error) throw error;
        return properties || [];
    } catch (error) {
        console.error("Error fetching properties:", error);
        return [];
    }
}

async function fetchAgents() {
    try {
        const { data: agents, error } = await supabase
            .from('agents')
            .select('*')
            .order('rating', { ascending: false }); // ترتيب الوكلاء حسب التقييم

        if (error) throw error;
        return agents || [];
    } catch (error) {
        console.error("Error fetching agents:", error);
        return [];
    }
}

async function displayProperties() {
    const properties = await fetchProperties();
    const propertiesContainer = document.getElementById('propertiesContainer');
    propertiesContainer.innerHTML = ''; // إفراغ الحاوية قبل إعادة التهيئة

    properties.forEach((property, index) => {
        const propertyCard = document.createElement('div');
        propertyCard.className = `col-md-4 animate-fade ${index % 2 === 0 ? 'delay-1' : 'delay-2'}`;
        
        propertyCard.innerHTML = `
            <div class="property-card">
                <div class="position-relative">
                    <img src="${property.image_url}" class="property-image w-100" 
                         alt="${property.title}" 
                         loading="lazy"> <!-- إضافة lazy loading -->
                    <div class="property-badge">${property.badge || 'عرض جديد'}</div>
                </div>
                <div class="p-3">
                    <h4 class="text-primary">${property.title || 'عقار مميز'}</h4>
                    <div class="d-flex justify-content-between mb-3">
                        <p class="text-muted"><i class="fas fa-map-marker-alt"></i> ${property.location || 'الموقع غير مُحدد'}</p>
                        <p class="text-primary fw-bold">${property.price?.toLocaleString('ar-SA') || 'السعر غير مُحدد'} ر.س</p>
                    </div>
                    <div class="row g-2 mb-3">
                        <div class="col-4">
                            <div class="bg-light p-2 text-center rounded">
                                <small class="d-block">المساحة</small>
                                <strong>${property.area || 'غير مُحدد'}م²</strong>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="bg-light p-2 text-center rounded">
                                <small class="d-block">الغرف</small>
                                <strong>${property.rooms || 'غير مُحدد'}</strong>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="bg-light p-2 text-center rounded">
                                <small class="d-block">الحمامات</small>
                                <strong>${property.bathrooms || 'غير مُحدد'}</strong>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-primary w-100">تفاصيل العقار</button>
                </div>
            </div>
        `;
        propertiesContainer.appendChild(propertyCard);
    });
}

async function displayAgents() {
    const agents = await fetchAgents();
    const agentsContainer = document.getElementById('agentsContainer');
    agentsContainer.innerHTML = ''; // إفراغ الحاوية قبل إعادة التهيئة

    agents.forEach((agent, index) => {
        const agentCard = document.createElement('div');
        agentCard.className = `col-md-3 animate-fade ${index % 2 === 0 ? 'delay-1' : 'delay-2'}`;
        
        agentCard.innerHTML = `
            <div class="agent-card text-center p-3">
                <img src="${agent.image_url}" class="rounded-circle mb-3 w-75 mx-auto" 
                     alt="${agent.name}" 
                     loading="lazy">
                <h5 class="mb-2">${agent.name || 'وكيل عقاري'}</h5>
                <div class="text-warning mb-3">
                    ${getStarRating(agent.rating || 0)}
                </div>
                <button class="btn btn-outline-primary w-100">اتصل الآن</button>
            </div>
        `;
        agentsContainer.appendChild(agentCard);
    });
}

function getStarRating(rating) {
    const fullStars = '<i class="fas fa-star"></i>'.repeat(Math.floor(rating));
    const halfStar = rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : '';
    const emptyStars = '<i class="far fa-star"></i>'.repeat(5 - Math.ceil(rating));
    return fullStars + halfStar + emptyStars;
}

// استدعاء الدوال مع التعامل مع الأخطاء
async function init() {
    try {
        await Promise.all([displayProperties(), displayAgents()]);
    } catch (error) {
        console.error("Initialization error:", error);
        Swal.fire({
            icon: 'error',
            title: 'خطأ في التحميل',
            text: 'حاول مرة أخرى لاحقًا'
        });
    }
}

// بدء التشغيل
document.addEventListener('DOMContentLoaded', init);