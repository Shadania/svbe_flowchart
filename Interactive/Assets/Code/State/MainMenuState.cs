using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Sapphus.State;
using Sapphus.Util;
using TMPro;

public class MainMenuState : CanvasGameState
{
    [SerializeField] private ClickButton _startButton;
    [SerializeField] private ClickButton _factsCheckbox;
    [SerializeField] private TextMeshProUGUI _factsCheckboxText;

    private bool _facts = true;

    public override string GetState()
    {
        return "Main Menu";
    }

    protected override void activateListeners()
    {
        _startButton.addListener(startFlowchart);
        _factsCheckbox.addListener(toggleFacts);
    }
    protected override void deactivateListeners()
    {
        _startButton.removeListener(startFlowchart);
        _factsCheckbox.removeListener(toggleFacts);
    }

    private void startFlowchart()
    {
        ((IngameState)_sm.GetState("Game")).SetFacts(_facts);
        _sm.SwitchState("Game");
    }
    private void toggleFacts()
    {
        _facts = !_facts;
        if (_facts)
            _factsCheckboxText.text = "x";
        else
            _factsCheckboxText.text = "";
    }
}
