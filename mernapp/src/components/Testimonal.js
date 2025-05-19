import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function TestimonialList() {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const response = await fetch('http://localhost:5000/api/fetch');
            const json = await response.json();
            if (json.success) {
                setTestimonials(json.testimonials);
            }
        };
        fetchTestimonials();
    }, []);

    const [testimonial, setTestimonial] = useState({ review: '', rating: '' });

    const handleChange = (e) => {
        setTestimonial({ ...testimonial, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('authToken');

        // if (!authToken) {
        //     alert("You must be logged in to submit a testimonial!");
        //     return;
        // }

        const response = await fetch('http://localhost:5000/api/submit', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
                //'authToken': authToken
            },
            body: JSON.stringify(testimonial)
        });

        const json = await response.json();
        if (json.success) {
            alert("Testimonial submitted successfully!");
            setTestimonial({ review: '', rating: '' });
        } else {
            alert(json.message);
            alert(response.message);
            
        }
    };

    return (
        <div className="container my-5">
           
            {/* Testimonial Form */}
            <div className="row justify-content-center">
                <div className="col-md-6">
                {(localStorage.getItem("authToken"))?
                <div className="card shadow p-4">
                      
                <h2 className="text-center mb-4">Submit Your Testimonial</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <textarea
                            name="review"
                            className="form-control"
                            placeholder="Write your review..."
                            value={testimonial.review}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            name="rating"
                            min="1"
                            max="5"
                            className="form-control"
                            placeholder="Rating (1-5)"
                            value={testimonial.rating}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Submit Review
                    </button>
                </form>
 
            </div>

                              : <p className="text-center">
                              Please <a href="/login">log in</a> to submit a review.
                            </p>}
                    
                </div>
            </div>

            {/* Testimonials List */}
            <div className="my-5">
                <h2 className="text-center mb-4">What Our Clients Say</h2>
                <div className="row">
                    {testimonials.length > 0 ? (
                        testimonials.map((t, index) => (
                            <motion.div 
                                key={index} 
                                className="col-md-4 mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="card text-center shadow p-3">  
                                    <img src={t.image }  className="rounded-circle mx-auto d-block" style={{ width: "80px", height: "80px" }}/>
                                    <h5 className="mt-2">{t.name}</h5>
                                    <p className="text-muted">{t.review}</p>
                                    <div className="text-warning">
                                        {'⭐'.repeat(t.rating)}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-center">No testimonials yet. Be the first to write one!</p>
                    )}
                </div>
            </div>
        </div>
    );
}





// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';

// export default function TestimonialList() {
//     const [testimonials, setTestimonials] = useState([]);

//     useEffect(() => {
//         const fetchTestimonials = async () => {
//             const response = await fetch('http://localhost:5000/api/testimonial/fetch');
//             const json = await response.json();
//             if (json.success) {
//                 setTestimonials(json.testimonials);
//             }
//         };
//         fetchTestimonials();
//     }, []);


//     const [testimonial, setTestimonial] = useState({ review: '', rating: '' });
    
//     const handleChange = (e) => {
//         setTestimonial({ ...testimonial, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const authToken = localStorage.getItem('authToken');

//         if (!authToken) {
//             alert("You must be logged in to submit a testimonial!");
//             return;
//         }

//         const response = await fetch('http://localhost:5000/api/testimonial/submit', {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'authToken': authToken
//             },
//             body: JSON.stringify(testimonial)
//         });

//         const json = await response.json();
//         if (json.success) {
//             alert("Testimonial submitted successfully!");
//             setTestimonial({ review: '', rating: '' });
//         } else {
//             alert(json.message);
//         }
//     };

//     return (
//       <div>
//         <div className="container mx-auto max-w-md p-6 bg-white shadow-lg rounded-lg">
//             <h2 className="text-center text-xl font-semibold mb-4">Submit Your Testimonial</h2>
//             <form onSubmit={handleSubmit}>
//                 <textarea
//                     name="review"
//                     className="w-full p-3 border rounded-md"
//                     placeholder="Write your review..."
//                     value={testimonial.review}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="number"
//                     name="rating"
//                     min="1"
//                     max="5"
//                     className="w-full p-2 mt-3 border rounded-md"
//                     placeholder="Rating (1-5)"
//                     value={testimonial.rating}
//                     onChange={handleChange}
//                     required
//                 />
//                 <button type="submit" className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600 transition-all">
//                     Submit Review
//                 </button>
//             </form>
//       </div>

//             <div className="container mx-auto p-6">
//             <h2 className="text-2xl font-bold text-center mb-6">What Our Clients Say</h2>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {testimonials.map((t, index) => (
//                     <motion.div 
//                         key={index} 
//                         className="bg-white p-4 rounded-lg shadow-lg text-center transition-transform hover:scale-105"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <img 
//                             src={t.image || '/default-avatar.png'} 
//                             alt={t.name} 
//                             className="w-16 h-16 rounded-full mx-auto mb-2"
//                         />
//                         <h3 className="text-lg font-semibold">{t.name}</h3>
//                         <p className="text-gray-600">{t.review}</p>
//                         <div className="flex justify-center mt-2">
//                             {'⭐'.repeat(t.rating)}
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//         </div>
//     );
// }
