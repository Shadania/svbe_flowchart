using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Sapphus.State;
using Sapphus.Util;

public class IngameState : CanvasGameState
{
    [SerializeField] private ClickButton _backButton;
    [SerializeField] private ClickButton _backToMenuButton;

    private bool _facts;

    public override string GetState()
    {
        return "Game";
    }

    public override void OnEnter()
    {
        base.OnEnter();
        // just entered this state, so nothing to go back to yet
        _backButton.gameObject.SetActive(false);
    }

    protected override void activateListeners()
    {
        _backButton.addListener(back);
        _backToMenuButton.addListener(backToMenu);
    }
    protected override void deactivateListeners()
    {
        _backButton.removeListener(back);
        _backToMenuButton.removeListener(backToMenu);
    }

    public void SetFacts(bool facts)
    {
        _facts = facts;
    }

    private void back()
    {
        // todo
    }

    private void backToMenu()
    {
        // todo clear out game state back to beginning to be ready
        _sm.SwitchState("Main Menu");
    }
}
