//C:\Users\Abbas Satwr\Desktop\مشاريعي\عقاري\properties\properties.js
import { supabase } from '../supabase-config.js';

async function fetchProperties() {
    try {
        const { data: properties, error } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false }); // ترتيب حسب الأحدث

        if (error) throw error;
        return properties || [];
    } catch (error) {
        console.error("Error fetching properties:", error);
        return [];
    }
}

async function displayProperties() {
    const properties = await fetchProperties();
    const propertiesList = document.getElementById('propertiesList');
    
    propertiesList.innerHTML = ''; // إفراغ الحاوية قبل الإضافة

    properties.forEach(property => {
        const propertyCard = document.createElement('div');
        propertyCard.className = 'col-md-4 animate-fade';
        
        propertyCard.innerHTML = `
            <div class="property-card shadow-sm rounded">
                <div class="position-relative">
                    <img src="${property.image_url}" alt="${property.title}" 
                         class="property-image w-100 rounded-top" loading="lazy">
                    ${property.badge ? `<div class="property-badge">${property.badge}</div>` : ''}
                </div>
                <div class="p-3">
                    <h5>${property.title}</h5>
                    <p><i class="fas fa-map-marker-alt"></i> ${property.location || 'غير محدد'}</p>
                    <p>السعر: ${property.price?.toLocaleString('ar-SA')} ر.س</p>
                    <button class="btn btn-primary w-100">تفاصيل العقار</button>
                </div>
            </div>`;
        
        propertiesList.appendChild(propertyCard);
    });
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', displayProperties);
