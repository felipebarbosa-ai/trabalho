import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Animated, Dimensions } from "react-native";

// Answer keys for programs
const gabarito021 = ["A","B","C","D","A","A","B","C","D","B","C","B","C","D","C","A","D","C","B","D","A","B","A","B","C","D","C","B","D","C"];
const gabarito022 = ["E","D","C","B","A","E","D","C","B","A","E","D","C","B","A","E","D","C","B","A","E","D","C","B","A","E","D","C","B","A"];

export default function Start() {
  const [programa, setPrograma] = useState("");
  const [num, setNum] = useState(1);
  const [tentativa, setTentativa] = useState(1);
  const [pontos, setPontos] = useState(0);
  const [gabarito, setGabarito] = useState<string[]>([]);
  const [showRespostas, setShowRespostas] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string>('');
  
  const [inputProg, setInputProg] = useState("");
  
  const reiniciarJogo = () => {
    // Reset all game state and return to program selection screen
    setPrograma("");
    setInputProg("");
    setPontos(0);
    setNum(1);
    setTentativa(1);
    setShowRespostas(false);
    setStatusMsg('');
  };
    const iniciar = () => {
  const prog = inputProg.trim();

  if (prog === "021") setGabarito(gabarito021);
  else if (prog === "022") setGabarito(gabarito022);
  else {
    setStatusMsg('');
    Alert.alert("Erro", "Número de jogo inválido!");
    return;
  }

  setPrograma(prog);
  setPontos(0);
  setNum(1);
  setTentativa(1);
  setShowRespostas(true);
   // Reset any previous status message
   setStatusMsg('');
 };
 
 const resposta = (r: string) => {

    const respostaCorreta = gabarito[num - 1];
    if (r === respostaCorreta) {
      const novoPonto = pontos + 1;
      const novoNum = num + 1;
      setPontos(novoPonto);
      setNum(novoNum);
      setTentativa(1);
      // Clear any status message on correct answer
      setStatusMsg('');
      // Verifica se todas as questões foram respondidas
      if (novoNum > gabarito.length) {
        Alert.alert("Sucesso", "Parabéns! Você completou todas as 30 questões.");
        // Reinicia o jogo
        setShowRespostas(false);
        setPrograma("");
        setInputProg("");
        return;
      }
      Alert.alert("Sucesso", "Resposta Correta");
    } else {
      const novaTentativa = tentativa + 1;
      setTentativa(novaTentativa);
      Alert.alert("Erro", "Resposta errada");
      if (novaTentativa > 3) {
        // Show retry message in visor
        setStatusMsg(`Tente novamente! Você fez ${pontos} pontos.`);
        setShowRespostas(true);
        setPrograma("");
        setInputProg("");
        // Reset counters for new game
        setNum(1);
        setTentativa(1);
        setPontos(0);
      }
    }
  };

  return (
    <View style={styles.gameCard}>
      {/* TECTOY Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoTextBase}>
          <Text style={styles.logoTextYellow}>TEC</Text>
          <Text style={styles.logoTextOrange}>TOY</Text>
        </Text>
      </View>

      {/* Main Display Visor */}
      <View style={styles.visorContainer}>
        {showRespostas ? (
          <Text style={styles.visorText}>
            {statusMsg ? statusMsg : `${programa}->${num}:`}
          </Text>
        ) : (
          <TextInput
            style={styles.visorInput}
            value={inputProg}
            onChangeText={setInputProg}
            keyboardType="numeric"
            placeholder="Digite o número do jogo"
            placeholderTextColor="#880000"
            maxLength={3}
          />
        )}
      </View>

      {/* Attempts Badge */}
      <View style={styles.badgeContainer}>
        <Text style={styles.tentativaBadge}>
          {showRespostas ? `Tentativa ${tentativa} de 3` : "Digite Prog."}
        </Text>
      </View>

      {/* Keyboard Grid */}
      <View style={styles.keyboardContainer}>
        {showRespostas ? (
          <View style={styles.grid}>
            <TouchableOpacity style={[styles.btn, styles.btnA]} onPress={() => resposta("A")}>
              <Text style={styles.btnText}>A</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnB]} onPress={() => resposta("B")}>
              <Text style={[styles.btnText, styles.btnTextB]}>B</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnC]} onPress={() => resposta("C")}>
              <Text style={styles.btnText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnD]} onPress={() => resposta("D")}>
              <Text style={styles.btnText}>D</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.grid}>
            <View style={[styles.btn, styles.btnA, { opacity: 0.5 }]}><Text style={styles.btnText}>A</Text></View>
            <View style={[styles.btn, styles.btnB, { opacity: 0.5 }]}><Text style={[styles.btnText, styles.btnTextB]}>B</Text></View>
            <View style={[styles.btn, styles.btnC, { opacity: 0.5 }]}><Text style={styles.btnText}>C</Text></View>
            <View style={[styles.btn, styles.btnD, { opacity: 0.5 }]}><Text style={styles.btnText}>D</Text></View>
          </View>
        )}
      </View>

      {/* Footer Start/Reset Button */}
      <View style={styles.footerArea}>
                  <TouchableOpacity style={styles.botaoStart} onPress={showRespostas ? reiniciarJogo : iniciar}>
          <Text style={styles.botaoStartText}>
            {showRespostas ? "Reiniciar Jogo" : "Iniciar Jogo"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const maxCardWidth = 400;
const cardWidth = Math.min(screenWidth - 40, maxCardWidth);

const styles = StyleSheet.create({
  gameCard: {
    backgroundColor: "#F4EBB2", // light yellow/beige
    padding: 20,
    width: cardWidth,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0d6a0",
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoTextBase: {
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -2,
    textShadowColor: "#d97706",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  logoTextYellow: {
    color: "#fbbf24",
  },
  logoTextOrange: {
    color: "#f59e0b",
  },
  visorContainer: {
    backgroundColor: "#000000",
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    marginBottom: 10,
  },
  visorText: {
    color: "#FF0000",
    fontSize: 32,
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  visorInput: {
    color: "#FF0000",
    fontSize: 48,
    fontFamily: "monospace",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
  badgeContainer: {
    backgroundColor: "#000000",
    width: "100%",
    paddingVertical: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  tentativaBadge: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "monospace",
  },
  keyboardContainer: {
    width: "100%",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
  },
  btn: {
    width: "48%",
    aspectRatio: 1, // Makes them square
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "4%",
    borderWidth: 2,
    borderColor: "#000",
  },
  btnA: {
    backgroundColor: "#FF0000",
  },
  btnB: {
    backgroundColor: "#FFFF00",
  },
  btnC: {
    backgroundColor: "#0000FF",
  },
  btnD: {
    backgroundColor: "#008000",
  },
  btnText: {
    fontSize: 48,
    color: "#FFFFFF",
    fontWeight: "400",
  },
  btnTextB: {
    color: "#FFFFFF", // Even on yellow, the image shows a white/light font. 
  },
  footerArea: {
    width: "100%",
  },
  botaoStart: {
    backgroundColor: "#CCCCCC",
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#000000",
    alignItems: "center",
  },
  botaoStartText: {
    color: "#000000",
    fontSize: 18,
  },
});
