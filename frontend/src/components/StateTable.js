import React, { useRef, useState } from "react";
import { useTableStatus } from "./TableContext";
import { useNavigate } from "react-router-dom";
import "./StateTable.css";

function StateTable({ tableNumber, onClose }) {
  const navigate = useNavigate();
  const { tableStatus, updateTableStatus } = useTableStatus();
  const choiceRefs = {
    liberer: useRef(null),
    reprendre: useRef(null),
    marquer: useRef(null),
  };
  const [isAnyChoiceActive, setIsAnyChoiceActive] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isOccuped, setIsOccuped] = useState(false);
  const [isPendingOrder, setIsPendingOrder] = useState(false);

  const handleChoiceChange = () => {
    const isActive = Object.values(choiceRefs).some((ref) =>
      ref.current.classList.contains("active")
    );
    setIsAnyChoiceActive(isActive);
  };

  const handleClick = (choice) => {
    // Retirez la classe "active" de tous les choix
    Object.values(choiceRefs).forEach((ref) => {
      ref.current.classList.remove("active");
    });

    // Ajoutez la classe "active" au choix actuel
    const choiceRef = choiceRefs[choice];
    if (choiceRef && choiceRef.current) {
      choiceRef.current.classList.toggle("active");
    }
    handleChoiceChange();
  };

  const validStatus = () => {
    Object.entries(choiceRefs).forEach(([key, ref]) => {
      if (ref.current.classList.contains("active")) {
        console.log(key);
        if (key === "reprendre") {
          setIsPendingOrder(!isPendingOrder);
        } else if (key === "liberer") {
          setIsOccuped(!isOccuped);
          !isOccuped && navigate("/tableSelection");
        } else {
          setIsAvailable(!isAvailable);
        }
      }
      ref.current.classList.remove("active");
    });
  };

  return (
    <div className="screen">
      <div className="modal">
        <h2>Table numero {tableNumber}</h2>
        <div
          className="choice"
          ref={choiceRefs.liberer}
          onClick={() => handleClick("liberer")}
        >
          {isOccuped ? "Libérer" : "Installer des clients à"} la table
        </div>
        {isOccuped ? (
          <div
            className="choice"
            ref={choiceRefs.reprendre}
            onClick={() => handleClick("reprendre")}
          >
            Reprendre la commande de la table
          </div>
        ) : (
          <span ref={choiceRefs.reprendre}></span>
        )}
        <div
          className="choice"
          ref={choiceRefs.marquer}
          onClick={() => handleClick("marquer")}
        >
          Marquer la table {isAvailable ? "indisponible" : "disponible"}
        </div>
        <div className="btn">
          <button onClick={() => onClose()}>Annuler</button>
          <button disabled={!isAnyChoiceActive} onClick={() => validStatus()}>
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}

export default StateTable;
