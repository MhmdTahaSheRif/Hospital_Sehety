import React, { useState } from 'react';
import { medicinesData } from './medicinesData';
import HeaderSection from './HeaderSection';
import Footer from './Footer';
import '../css/MedicineSearch.css';

const MedicineSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', ...new Set(medicinesData.map(item => item.category))];

    const filteredMedicines = medicinesData.reduce((acc, category) => {
        const filteredCategoryMedicines = category.medicines.filter(medicine =>
            medicine.name.includes(searchTerm) ||
            medicine.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return [...acc, ...filteredCategoryMedicines];
    }, []).filter(medicine =>
        selectedCategory === 'all' ||
        medicinesData.find(cat =>
            cat.category === selectedCategory &&
            cat.medicines.some(med => med.id === medicine.id)
        )
    );

    return (
        <>
            <HeaderSection isLoggedIn={true} />
            <div className="search-container">
                <div className="search-controls">
                    <input
                        type="text"
                        placeholder="ابحث عن دواء..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="category-select"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'كل التصنيفات' : category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="medicines-grid">
                    {filteredMedicines.map(medicine => (
                        <div key={medicine.id} className="medicine-card">
                            <div className="medicine-content">
                                <div className="image-section">
                                    <div className="medicine-image-container">
                                        <img
                                            src={medicine.image}
                                            alt={medicine.name}
                                            className="medicine-image"
                                        />
                                    </div>
                                </div>
                                <div className="details-section">
                                    <h3 className="medicine-title">{medicine.name}</h3>
                                    <p className="medicine-info">{medicine.scientificName}</p>
                                    <p className="medicine-info">{medicine.strength}</p>
                                    <p className="medicine-info">{medicine.manufacturer}</p>
                                    <p className="medicine-price">{medicine.price} جنيه</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MedicineSearch;
