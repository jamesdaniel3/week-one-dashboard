import React from 'react';

export default function Calendar() {
    return (
        <div>
            <iframe
                src="https://calendar.google.com/calendar/embed?src=c_b3fdd1bc2b458c1c72db3b568493f31612679146b2743547af142de64c0567d7%40group.calendar.google.com&ctz=America%2FNew_York"
                style={{border: "0"}}
                width="800"
                height="600"
            ></iframe>
        </div>
    );
};
