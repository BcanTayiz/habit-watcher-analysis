import React, { useState,useEffect } from 'react';
import { remaindeCheck } from '../../services/storage';
import { Habbit } from '../../models/habbit';
import { Modal, Button } from "@mantine/core";


export default function Remainder(props: { remainder: number }) {
    const [remainderState, setRemainderState] = useState<boolean>(false);

    useEffect(() => {
      const fetchData = async () => {
        const result = await remaindeCheck(props.remainder); // Asenkron işlemi bekle
        setRemainderState(result); // State güncelle
      };
  
      fetchData();
    }, [props.remainder]);

  return (
    <div>

        <Modal opened={remainderState} onClose={() => setRemainderState(false)} title="Reminder">
                {remainderState ? (
                <> {/* JSX for remainderState === true */}
                    🟢 Your reminder is active!
                </>
                ) : (
                <> {/* JSX for remainderState === false */}
                    🔴 No active reminders.
                </>
                )}
      </Modal>
    </div>
  )
}
